import {useState, useContext,useEffect} from 'react';
import Card from './shared/Card'
import Button from './shared/Button';
import Rating from './Rating';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackForm = () => {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(8);
    const [disable, setDisable] = useState(true);
    const [message, setMessage] = useState('');
    const {addHandle, editFeedbackStata, updateFeedback} = useContext(FeedbackContext);

    useEffect(()=>{
        if(editFeedbackStata.edit === true){
            setDisable(false);
            setText(editFeedbackStata.item.text);
            setRating(editFeedbackStata.item.rating)
        }
       
    },[editFeedbackStata])

    const handleValueChange = (e)=>{
        if(text.trim().length === 0){
            setMessage(null);
            setDisable(true);
        } else if(text !== '' && text.trim().length < 10){
            setMessage('the text should be > 10 characters');
            setDisable(true);
        } else {
            setMessage(null);
            setDisable(false);
        }
        setText(e.target.value)
    }

   const handleSubmit =(e)=>{
    e.preventDefault();
    if(text.trim().length > 10){
        const newFeedback = {
            text,
            rating
        } 
        if(editFeedbackStata.edit === true){
        
            updateFeedback(editFeedbackStata.item.id, newFeedback)
        } else {
            addHandle(newFeedback)
        }
    }
    setDisable(true);
    setRating(8)
    setText('')
   }

 
  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>What would you rate??</h2>
          <Rating select={(rating)=> setRating(rating)}/>
            <div className="input-group">
                <input onChange={handleValueChange} type="text" placeholder='Write your review' value={text} />
                <Button type='submit' isDisabled={disable}>Send</Button>
            </div>
            {
                message && <div className='message'>{message}</div>
            }
        </form>
    </Card>
  )
}

export default FeedbackForm