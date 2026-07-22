import "./Stats.css";
import { useEffect, useState } from "react"

function Stats() {

  const [students, setStudents] = useState(0)
  const [courses, setCourses] = useState(0)
  const [projects, setProjects] = useState(0)

  useEffect(() => {

    let s = 0
    let c = 0
    let p = 0

    const interval = setInterval(() => {

      if(s < 10){
        s++
        setStudents(s)
      }

      if(c < 120){
        c += 5
        setCourses(c)
      }

      if(p < 50){
        p += 2
        setProjects(p)
      }

    },50)

    return () => clearInterval(interval)

  },[])

  return (

    <section className="stats">

      <div className="card">
        <h1>{students}K+</h1>
        <p>Students</p>
      </div>

      <div className="card">
        <h1>{courses}+</h1>
        <p>Courses</p>
      </div>

      <div className="card">
        <h1>{projects}+</h1>
        <p>Projects</p>
      </div>

    </section>

  )
}

export default Stats