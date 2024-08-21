import React from 'react';

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <button className="btn-view-tasks">Ver Tareas</button>
    </div>
  );
}

export default ProjectCard;