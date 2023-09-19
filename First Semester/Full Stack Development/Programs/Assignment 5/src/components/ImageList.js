import React from "react";

const ImageList = (props) => {

	const pixabay_images = props.pixabay_images.map((image) => {
		return (
			<img
				key={image.id}
				src={image.largeImageURL}
				alt={image.tags}
				className="rounded-md max-h-52"
			/>
		);
	});

	const unsplash_images = props.unsplash_images.map((image) => {
		return (
			<img
				key={image.id}
				src={image.urls.full}
				alt={image.alt_description}
				className="rounded-md max-h-52"
			/>
		);
    });
    
    const pexels_images = props.pexels_images.map((image) => {
        return (
            <img
                key={image.id}
                src={image.src.large2x}
                alt={image.alt}
                className="rounded-md max-h-52"
            />
        )
    })
    
    const images_list = pixabay_images.concat(unsplash_images);
    images_list.concat(pexels_images);
	const shuffledImagesList = images_list.sort(() => Math.random() - 0.5);
	return (
		<div className="flex flex-wrap gap-y-6 gap-x-4 p-4 justify-evenly">
			{shuffledImagesList}
		</div>
	);
};

export default ImageList;
