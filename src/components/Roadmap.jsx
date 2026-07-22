import "./Roadmap.css";
import { motion } from "framer-motion"

import {
  FaHtml5,
  FaJs,
  FaReact,
  FaNodeJs,
  FaBriefcase
} from "react-icons/fa"

function Roadmap() {

  const roadmap = [

    {
      icon:<FaHtml5 />,
      text:"Learn HTML & CSS"
    },

    {
      icon:<FaJs />,
      text:"Master JavaScript"
    },

    {
      icon:<FaReact />,
      text:"Build React Projects"
    },

    {
      icon:<FaNodeJs />,
      text:"Learn Backend Development"
    },

    {
      icon:<FaBriefcase />,
      text:"Apply For Jobs"
    }

  ]

  return (

    <motion.section
      className="roadmap"
      initial={{ opacity:0, y:100 }}
      whileInView={{ opacity:1, y:0 }}
      transition={{ duration:1 }}
      viewport={{ once:true }}
    >

      <h2>Developer Roadmap</h2>

      <div className="roadmap-container">

        {roadmap.map((step, index) => (

          <div
            className="roadmap-step"
            key={index}
          >

            <div className="circle">
              {step.icon}
            </div>

            <p>{step.text}</p>

          </div>

        ))}

      </div>

    </motion.section>

  )
}

export default Roadmap