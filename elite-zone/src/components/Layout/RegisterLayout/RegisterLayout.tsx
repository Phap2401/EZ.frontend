import { useEffect } from 'react'
import ApiClient from '~/api/ApiClient'
const Register = () => {
    useEffect(() => {
        const response = ApiClient.postJsonData('/updateAvatar', {},{} )
    }, [])
    return (
        <div>AAAAAA</div>
    )
}
export default Register