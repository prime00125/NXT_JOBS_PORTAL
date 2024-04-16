import './index.css'
import {Link} from 'react-router-dom'


const Card = props => {
  const {d} = props
  const {id, rating, empTime, jobDescip, location, title, logo, pac} = d

  return (
    <Link to={`/jobs/${id}`}>
    <div key={id} className='card'>
      <div className='a'>
        <img src={logo} className='logo' />
        <section className='aa'>
          <h1>{title}</h1>
          <p>* {rating}</p>
        </section>
      </div>
      <div className='b'>
        <div className='bb'>
          <span>{location}</span>
          <span>{empTime}</span>
        </div>
        <span>{pac}</span>
      </div>
      <h3 className='head'>Description</h3>
      <br />
      <p className='para'>{jobDescip}</p>
    </div>
    </Link>
  )
}
export default Card
