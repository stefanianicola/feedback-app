import { Link } from 'react-router-dom'
import Card from '../components/shared/Card'

const AboutPage = () => {
  return (
    <Card>
        <h1>About feedback App</h1>
        <p>This is an App to leave a feedback to product or service</p>
        <p>
            <Link to="/">Back to Home</Link>
        </p>
    </Card>
  )
}

export default AboutPage