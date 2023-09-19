import React from "react";
import SearchInput from "./SearchInput";
import ImageList from "./ImageList";
import axios from "axios";
import { createClient } from "pexels";
import "../style.css";

const pixabay_api_key = "18846369-871c95044dd7c0f31f2b303e0";
const unsplash_api_key = "UBAXKPq5WgOxU9z7XjLZrt8B0hayG2dv8gh_vyGQg-0";
const pexels_api_key =
	"RfvKt0kQLXP7affcVkFgHWHcsRSD9CGKz91wOPBeLf7suLFEJJdjSWv3";

class App extends React.Component {
	state = {
		pixabay_images: [],
		unsplash_images: [],
		pexels_images: [],
	};

	onSearchSubmit = async (entry) => {
		const pixabay_response = await axios.get(
			`https://pixabay.com/api/?key=${pixabay_api_key}&q=${entry}&image_type=photo&pretty=true&per_page=200`
		);

		const numberOfPhotos = 30;

		const unsplash_response = await axios.get(
			`https://api.unsplash.com/search/photos/?query=${entry}&client_id=${unsplash_api_key}&per_page=${numberOfPhotos}`
		);

		const client = createClient(pexels_api_key);
		const query = entry;

		const pexels_response = await client.photos.search({
			query,
			per_page: 80,
		});
		console.log(pexels_response.photos);
		// const unsplash_response = {
		// 	data: {
		// 		results: [],
		// 	},
		// };
		console.log(unsplash_response.data.results);
		// console.log(response.data.hits);
		this.setState({
			pixabay_images: pixabay_response.data.hits,
			unsplash_images: unsplash_response.data.results,
			pexels_images: pexels_response.photos,
		});
	};

	render() {
		return (
			<div className="flex flex-col gap-2">
				<h1 className="text-4xl text-center dark:text-gray-900 text-white m-4">
					Image Searcher
				</h1>
				<SearchInput onSearchSubmit={this.onSearchSubmit} />
				<div className="text-center">
					We got {this.state.pixabay_images.length} images from
					Pixabay.<br></br>
					We got {this.state.unsplash_images.length} images from
					Unsplash.
					<br></br>
					We got {this.state.pexels_images.length} images from Pexels.
				</div>
				<ImageList
					pixabay_images={this.state.pixabay_images}
					unsplash_images={this.state.unsplash_images}
					pexels_images={this.state.pexels_images}
				/>
			</div>
		);
	}
}

export default App;
