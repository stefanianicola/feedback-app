import { useContext } from 'react';
import FeedbackItem from './FeedbackItem';
import FeedbackContext  from '../context/FeedbackContext';
import {motion, AnimatePresence } from 'framer-motion';

const FeedbackList = () => {
  const {feedback} = useContext(FeedbackContext)
  return (
    <div className='feedback-list'>
<AnimatePresence>
         {
            feedback.length > 0 ? (feedback.map((item)=> (
            <motion.div 
            key={item.id}
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            >
                <FeedbackItem key={item.id} item={item} />
            </motion.div>)))
                            : (<p> No feedback yet</p> )
        
      }
      </AnimatePresence>
    </div>
   
  )
}

export default FeedbackList
