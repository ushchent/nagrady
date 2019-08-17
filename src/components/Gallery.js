import React from "react";
import { Link } from "react-router-dom";

const Gallery = (props) => {
	const random_images = Object.keys(props.data)
						.sort(() => .5 - Math.random()).slice(0,3);
	return (
		<div className="gallery">
			{ random_images.map(item => 
				<div className="nagrada"
					key={item}>
				<Link to={`/nagrada/${item}`}>
					<img src={`img/${item}.jpg`}
					alt={ props.data[item] }
					title={ props.data[item] }
					/>
				</Link>
				<Link to={`/nagrada/${item}`}><p>{props.data[item]}</p></Link>
                   </div>
                    )
              }
       </div> 
	);
}

export default Gallery;
