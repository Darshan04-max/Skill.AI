import "./Skills.css";
import { motion } from "framer-motion"
import { useState } from "react"
import skills from "../data"


function Skills() {

  const [search, setSearch] = useState("")

  const filteredSkills = skills.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
  <motion.section
className="skills"
initial={{ opacity:0, y:100 }}
whileInView={{ opacity:1, y:0 }}
transition={{ duration:1 }}
viewport={{ once:true }}
>

      <h2>Search Skills</h2>

      <input
        type="text"
        placeholder="Search skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="cards">

        {filteredSkills.map((item, index) => (
          <div className="card" key={index}>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

          </div>
        ))}

      </div>

   </motion.section>
  )
}

export default Skills