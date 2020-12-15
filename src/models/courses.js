import axios from '../util/axiosWrapper';
import Course from './course'

class Courses{

    fetchCourses = (then, error) => {
        axios.get('/apiv0/courses/')
        .then( (res) => {
            this.courseList = res.data.map( (c) => Course(c))
            then(this.courseList);
        } ).catch( (mes) => {
            error(mes)
        } )
    }

    getCourses = () => {
        
    }

}

export default Courses;