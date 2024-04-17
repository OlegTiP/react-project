import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={270}
    height={465}
    viewBox="0 0 270 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="293" y="75" rx="3" ry="3" width="410" height="6" /> 
    <rect x="0" y="275" rx="10" ry="10" width="260" height="22" /> 
    <rect x="1" y="309" rx="10" ry="10" width="260" height="88" /> 
    <rect x="4" y="412" rx="10" ry="10" width="90" height="30" /> 
    <rect x="106" y="411" rx="30" ry="30" width="150" height="30" /> 
    <circle cx="133" cy="138" r="119" />
  </ContentLoader>
)

export default Skeleton

// сайт для генерации скелетонов https://skeletonreact.com/