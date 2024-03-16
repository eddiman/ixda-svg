
import React from 'react';
import AnimatedLink from './AnimatedLink'; // Assuming you have the AnimatedLink component defined in a separate file

const NavBar = ({activeNo, handleCallback, ...props}) => {
  console.log(handleCallback);
  
  return (
    <nav>
      {activeNo ? <AnimatedLink styleClass="color-0" to="/" animationClass="selected" callback={handleCallback} > {`<`}</AnimatedLink> : ""}
      <AnimatedLink styleClass={`color-1 ${activeNo == 1 ? "active" :""}`} to="/about" isActive={activeNo == 1} animationClass="selected" callback={handleCallback}>About</AnimatedLink>
      <AnimatedLink styleClass={`color-2 ${activeNo == 2 ? "active" :""}`} to="/f" isActive={activeNo == 2} animationClass="selected" callback={handleCallback}>Work</AnimatedLink>
      <AnimatedLink styleClass={`color-3 ${activeNo == 3 ? "active" :""}`} to="/s" isActive={activeNo == 3} animationClass="selected" callback={handleCallback}>Hobby</AnimatedLink>
      <AnimatedLink styleClass={`color-4 ${activeNo == 4 ? "active" :""}`} to="/s" isActive={activeNo == 4} animationClass="selected" callback={handleCallback}>Photography</AnimatedLink>
      <AnimatedLink styleClass={`color-5 ${activeNo == 5 ? "active" :""}`} to="/a" isActive={activeNo == 5} animationClass="selected" callback={handleCallback}>Contact</AnimatedLink>
    </nav>
  );
}

export default NavBar;