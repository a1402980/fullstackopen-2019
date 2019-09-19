import React from 'react'
import Part from './Part'

const Header = ({ courseName }) => {
  return (
    <h1>{courseName}</h1>
  )
}

const Total = ({numbers}) => {
  return <p>yhteensä {numbers.reduce((a,b)=>a+b)} tehtävää</p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      {course.parts.map(part => <Part key={part.id} course={part} />)}
      <Total numbers={course.parts.map(part => part.exercises)}/>
    </div>
  )
}

export default Course;
