import { useState, createContext } from "react";
import FeedbackData from '../data/FeedbackData';
import {v4 as uuidv4} from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({children})=>{
    const [feedback, setFeedback] = useState(FeedbackData);
    const [editFeedbackStata, setEditFeedbackStata] = useState({item: {}, edit: false});

    const updateFeedback = (id, uptItem)=>{
    
      setFeedback(feedback.map(item=> item.id === id ? {...item, text:uptItem.text, rating: uptItem.rating} : {...item}))
    
  }

    const addHandle = (newFeedback)=>{
      console.log('entro new',editFeedbackStata)
            newFeedback.id = uuidv4();
            setFeedback([newFeedback, ...feedback]);
        
      }
    
      const handleDelete = (id)=>{
    if(window.confirm('Are you sure to delete?')){
      setFeedback(feedback.filter( item => item.id !== id))
    }
      }

      const editFeedback = (item)=>{
        setEditFeedbackStata({item: item, edit: true});
      }

    return (
        <FeedbackContext.Provider 
        value={{
            feedback,
            addHandle,
            handleDelete,
            editFeedback,
            editFeedbackStata,
            updateFeedback
            }}>
                {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext;