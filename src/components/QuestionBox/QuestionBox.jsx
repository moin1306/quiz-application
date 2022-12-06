import React, { useContext } from 'react'
import './QuestionBox.css'
import { Badge } from '@chakra-ui/react'
import quizContext from '../../context/quizContext'
// import ReactAudioPlayer from 'react-audio-player';
import clickAudio from './../../Assets/select-sound.mp3'

// #0b4b06 - bg
// #53a24db5 - border
var audio = new Audio(clickAudio);

const QuestionBox = (props) => {
    let selectedAns = ''
    const context = useContext(quizContext)
    const { setScore, score, next, setNext, len } = context
    const { question, options, category } = props
    //Here options[0] = options array and options[1] = correct answer
    let i = -1
    const alphabet = ['A', 'B', 'C', 'D']

    const checkAnswer = (selectedAns) => {
        if (selectedAns === '') {
            return true;
        } else if (selectedAns === options[1]) {
            setScore({ ...score, 'rightAnswers': score.rightAnswers + 1 })
        } else {
            setScore({ ...score, 'wrongAnswers': score.wrongAnswers + 1 })
        }
    }

    const handleOptionClick = (e) => {
        selectedAns = (e.target.innerText.slice(1)).trim()
        console.log(selectedAns)
        audio.play();
    }

    const handleNextQuestion = () => {
        if (next <= len - 1) {
            checkAnswer(selectedAns)
            setNext(next + 1)
        }
    }

    return (
        <>
            {/* <ReactAudioPlayer
                style={{ display: 'none' }}
                src={clickAudio}
                autoPlay
                controls
            /> */}
            <div className="q-box mx-auto my-5 p-4 text-center">
                <div className="q-box_head">
                    <div className="q-box_timer">30s</div>
                    <div className="q-question" dangerouslySetInnerHTML={{ __html: question }}></div>
                </div>
                <div className="q-box_body">
                    {
                        options[0].map((index) => {
                            i++;
                            return <div key={index} onClick={handleOptionClick} className="q-box_options">
                                <div className='option-icon'>{alphabet[i]}</div> <div dangerouslySetInnerHTML={{ __html: index }}></div>
                            </div>
                        })
                    }
                </div>
                <div className="d-flex flex-wrap justify-content-between align-items-center mx-3">
                    <Badge colorScheme='purple'>{category}</Badge>
                    <button onClick={handleNextQuestion} className="btn btn-primary m-2">{(next >= len - 1) ? 'Submit' : 'Next'}</button>
                </div>
            </div>
        </>
    )
}

export default QuestionBox
