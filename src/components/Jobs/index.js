import {useState, useContext, useEffect} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Card from '../Card'
import './index.css'
const apiVar = {
  init: 'INIT',
  success: 'Success',
  failure: 'Failure',
  inProgress: 'INPROGRESS',
}

const empType = [
  {
    id: 'FULLTIME',
    name: 'fulltime',
  },
  {
    id: 'INTERNSHIP',
    name: 'internship',
  },
  {
    id: 'PARTTIME',
    name: 'partime',
  },
  {
    id: 'FREELANCE',
    name: 'freelance',
  },
]

const salaryRange = [
  {
    id: '1000000',
    name: '10 LPA AND ABOVE',
  },

  {
    id: '2000000',
    name: '20 LPA AND ABOVE',
  },

  {
    id: '3000000',
    name: '30 LPA AND ABOVE',
  },

  {
    id: '4000000',
    name: '40 LPA AND ABOVE',
  },
]

const Home = () => {
  const [list, setList] = useState([])
  const [apiDetails, setApiDetails] = useState(apiVar.init)
  const [input, setInput] = useState('')
  const [emp, setEmp] = useState('')
  const [sal, setSal] = useState('')

  const fetchedData = async () => {
    setApiDetails(apiVar.inProgress)
    const api = `https://apis.ccbp.in/jobs?employment_type=${emp}&minimum_package=${sal}&search=${input}`
    const jwtToken = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, option)
    const data = await response.json()
    if (response.ok) {
      const formattedData = data.jobs.map(each => ({
        id: each.id,
        rating: each.rating,
        empTime: each.employment_type,
        jobDescip: each.job_description,
        location: each.location,
        title: each.title,
        logo: each.company_logo_url,
        pac: each.package_per_annum,
      }))
      setApiDetails(apiVar.success)
      setList(formattedData)
    } else {
      setApiDetails(apiVar.failure)
    }
  }
  useEffect(() => {
    fetchedData()
  }, [input, emp, sal])
  const renderSuccessView = () => (
    <div className='se'>
      {list.map(each => (
        <Card key={each.id} d={each} />
      ))}
    </div>
  )
  const renderFailureView = () => <h1>Failure</h1>
  const renderAllView = () => {
    switch (apiDetails) {
      case apiVar.failure:
        return renderFailureView()
      case apiVar.success:
        return renderSuccessView()
      default:
        return null
    }
  }
  const goit = event => {
    setInput(event.target.value)
  }

  const femploye = id => {
    setEmp(id)
  }

  const fsalary = id => {
    setSal(id)
  }
  return (
    <div>
      <Header />
      <div className='jobs'>
        <div className='filter'>
          <ul className='btn-list'>
            {empType.map(each => (
              <p
                className='btn-type '
                key={each.id}
                onClick={() => femploye(each.id)}
              >
                {each.name}
              </p>
            ))}
          </ul>
          <ul style={{marginTop: '200px'}}>
            {salaryRange.map(each => (
              <p
                className='btn-type'
                key={each.id}
                onClick={() => fsalary(each.id)}
              >
                {each.name}
              </p>
            ))}
          </ul>
        </div>
        <div className='right'>
          <input
            className='inp'
            type='search'
            value={input}
            onChange={goit}
            placeHolder='Search by job Name'
          />
          {renderAllView()}
        </div>
      </div>
    </div>
  )
}
export default Home
