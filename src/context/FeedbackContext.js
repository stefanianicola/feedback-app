import { useState, createContext, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children})=>{
  const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);
    const [editFeedbackStata, setEditFeedbackStata] = useState({item: {}, edit: false});

    useEffect(()=>{
      feedbackFetch();
    },[])

    const feedbackFetch = async ()=>{
      const response = await fetch("/feedback?_sort=id&_order=desc")
      const data = await response.json();
      setFeedback(data);
      setIsLoading(false) 
    }

    const updateFeedback = async (id, uptItem)=>{
      const response = await fetch(`/feedback/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": `application/json`,
        },
       body: JSON.stringify(uptItem)
      })
          const data = await response.json();
      setFeedback(feedback.map(item=> item.id === id ? {...item, text:data.text, rating: data.rating} : {...item}))
  }

    const addHandle = async (newFeedback)=>{
        const response = await fetch('/feedback', {
          method: 'POST',
          headers: {
            "Content-Type": `application/json`,
          },
         body: JSON.stringify(newFeedback)
        })
            const data = await response.json();
            setFeedback([data, ...feedback]);
        
      }
    
      const handleDelete = async (id)=>{
    if(window.confirm('Are you sure to delete?')){
      await fetch(`/feedback/${id}`, {method: 'DELETE'})
     
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
            isLoading,
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