import axios from '../util/axiosWrapper';
// import Course from './course'

class Course{

    fetchCourses = (then, error) => {
        axios.get('/apiv0/courses/')
        .then( (res) => {
            this.courseList = res.data.map( (c) => Course(c))
        } )
    }

}

export default Course;