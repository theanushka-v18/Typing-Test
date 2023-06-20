import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { generate } from "random-words";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../context/TestModeContext";
import Stats from "./Stats";

const TypingBox = () => {
  const inputRef = useRef(null);

  const [wordsArray, setWordsArray] = useState(() => {
    return generate(50);
  });

  const { testTime } = useTestMode();
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [countDown, setCountDown] = useState(testTime);
  const [correctChars, setCorrectChars] = useState(0);
  const [wrongChars, setWrongChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [graphData, setGraphData] = useState([]);

  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArray]);

  const calculateWPM = () => {
    return Math.round(correctChars / 5 / (testTime / 60));
  };

  const calculateAccuracy = () => {
    return Math.round((correctWords / currWordIndex) * 100);
  };

  function focusInput() {
    inputRef.current.focus();
  }

  useEffect(() => {
    resetTest();
  }, [testTime]);

  useEffect(() => {
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = "current";
  }, []);

  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);

    function timer() {
      setCountDown((latestCountDown) => {
        setCorrectChars((correctChars) => {
            setGraphData((graphData) => {
                return [...graphData, [
                    testTime-latestCountDown+1,
                    (correctChars/5)/((testTime-latestCountDown+1)/60)
                ]];
            })
            return correctChars;
        })
        if (latestCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        return latestCountDown - 1;
      });
    }
  };

  const resetTest = () => {
    clearInterval(intervalId);
    setCountDown(testTime);
    setCurrWordIndex(0);
    setCurrCharIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(generate(50));
    resetWordSpanRefClassname();
    focusInput();
  };

  const resetWordSpanRefClassname = () => {
    wordsSpanRef.map((i) => {
      Array.from(i.current.childNodes).map((j) => {
        j.className = "";
      });
    });
    wordsSpanRef[0].current.childNodes[0].className = "current";
  };

  const handleUserInput = (e) => {
    if (!testStart) {
      startTimer();
      setTestStart(true);
    }

    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

    if (e.keyCode === 32) {
      let correctCharsInWords =
        wordsSpanRef[currWordIndex].current.querySelectorAll(".current");

      if (correctCharsInWords.length === allCurrChars.length) {
        setCorrectWords(correctWords + 1);
      }

      if (allCurrChars.length <= currCharIndex) {
        allCurrChars[currCharIndex - 1].classList.remove("current-right");
      } else {
        setMissedChars(missedChars + (allCurrChars.length - currCharIndex));
        allCurrChars[currCharIndex].classList.remove("current");
      }

      wordsSpanRef[currWordIndex + 1].current.childNodes[0].className =
        "current";
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(0);
      return;
    }

    if (e.keyCode === 8) {
      if (currCharIndex !== 0) {
        if (allCurrChars.length === currCharIndex) {
          if (allCurrChars[currCharIndex - 1].className.includes("extra")) {
            allCurrChars[currCharIndex - 1].remove();
            allCurrChars[currCharIndex - 2].className += "current-right";
          } else {
            allCurrChars[currCharIndex - 1].className = "current";
          }
          setCurrCharIndex(currCharIndex - 1);
          return;
        }
        allCurrChars[currCharIndex].className = "";
        allCurrChars[currCharIndex - 1].className = "current";
        setCurrCharIndex(currCharIndex - 1);
      }
      return;
    }

    if (currCharIndex === allCurrChars.length) {
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "wrong extra current-right";
      allCurrChars[currCharIndex - 1].classList.remove("current-right");
      wordsSpanRef[currWordIndex].current.appendChild(newSpan);
      setCurrCharIndex(currCharIndex + 1);
      setExtraChars(extraChars + 1);
      return;
    }

    if (e.key === allCurrChars[currCharIndex].innerText) {
      allCurrChars[currCharIndex].className = "correct";
      setCorrectChars(correctChars + 1);
    } else {
      allCurrChars[currCharIndex].className = "wrong";
      setWrongChars(wrongChars + 1);
    }

    if (currCharIndex + 1 === allCurrChars.length) {
      allCurrChars[currCharIndex].className += " current-right";
    } else {
      allCurrChars[currCharIndex + 1].className = "current";
    }

    setCurrCharIndex(currCharIndex + 1);
  };

  return (
    <div>
      <UpperMenu countDown={countDown} />
      {testEnd ? (
        <Stats
          wpm={calculateWPM()}
          accuracy={calculateAccuracy()}
          correctChars={correctChars}
          wrongChars={wrongChars}
          missedChars={missedChars}
          extraChars={extraChars}
          graphData={graphData}
        />
      ) : (
        <div className="type-box" onClick={focusInput}>
          <div className="words">
            {wordsArray.map((word, index) => (
              <span className="word" ref={wordsSpanRef[index]}>
                {word.split("").map((char) => (
                  <span>{char}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}
      <input
        type="text"
        ref={inputRef}
        className="hidden-input"
        onKeyDown={handleUserInput}
      />
    </div>
  );
};

export default TypingBox;
