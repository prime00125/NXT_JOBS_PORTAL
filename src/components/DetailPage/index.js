import {useState, useContext, useEffect} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'
import {useParams} from 'react-router-dom'

const apiVar = {
  init: 'INIT',
  success: 'Success',
  failure: 'Failure',
  inProgress: 'INPROGRESS',
}

const DetailPage = () => {
  const [view, setView] = useState({})
  const [apiDetails, setApiDetails] = useState(apiVar.init)
  const {id} = useParams()

  const fetchedData = async () => {
    setApiDetails(apiVar.inProgress)
    const api = `https://apis.ccbp.in/jobs/${id}`
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
      const formattedData = {
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebSiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        imageForLifeAtCompany: data.job_details.life_at_company.image_url,
        descriptionForLifeAtCompany:
          data.job_details.life_at_company.description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
      }
      setApiDetails(apiVar.success)
      setView(formattedData)
    } else {
      setApiDetails(apiVar.failure)
    }
  }
  useEffect(() => {
    fetchedData()
  }, [id])
  const renderSuccessView = () => (
    <div className='Details'>
      <img src={view.companyLogoUrl} className='DetailLogo' />
      <span> {view.location}</span>
      <span> {view.employmentType}</span>
      <span> {view.rating}</span>
      <span> {view.packagePerAnnum}</span>
      <h2> {view.jobDescription}</h2>
      <br />
      <h3>{view.descriptionForLifeAtCompany}</h3>
      <img src={view.imageForLifeAtCompany} className='lifeImage' />
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
  return (
    <div>
      <Header />
      {renderAllView()}
    </div>
  )
}
export default DetailPage
