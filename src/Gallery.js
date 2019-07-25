import React from "react";
import { Link } from "react-router-dom";

const Gallery = (props) => {
	const random_images = props.data.filter(e => e.status === 1)
						.map(d => ({ id: d.id, title: d.title }))
						.sort(() => .5 - Math.random()).slice(0,3);
	return (
		<div className="gallery">
				{ random_images.map(item => 
					<div className="nagrada"
						key={item.id}>
					<Link to={`/nagrada/${item.id}`}>
						<img src={`img/${item.id}.jpg`}
						alt={ item.title }
						title={ item.title }
						/>
					</Link>
					<Link to={`/nagrada/${item.id}`}><p>{item.title}</p></Link>
                    </div>
                     )
                }
        </div>
	);
}

export default Gallery;
