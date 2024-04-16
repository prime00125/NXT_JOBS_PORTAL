import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'
const Jobs = () => {
  return (
    <>
      <Header />
      <div className='home'>
        <section className='parta'>
          <h1>FIND YOUR RIGHT JOB</h1>
          <button className='btnhome'>FIND JOBS</button>
        </section>
        <img
          src='https://assets.ccbp.in/frontend/react-js/home-lg-bg.png'
          className='img'
        />
      </div>
    </>
  )
}
export default Jobs
