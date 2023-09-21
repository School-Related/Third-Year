import React from "react";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
import { BaseUrlContext } from "../context/BaseUrlContext";
import Book from "../components/ui/Book";

const Home = () => {
  const [books, setBooks] = React.useState([]);
  const { baseUrl } = React.useContext(BaseUrlContext);
  const apiUrl = baseUrl;
  const retrieve_books = async () => {
    const response = await axios
      .get(apiUrl + "/books")
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        alert("some error occured");
      });
    setBooks(response);
  };

  React.useEffect(() => {
    retrieve_books();
  }, []);
  return (
    <div>
      <section className="w-full">
        {/* <div class="background"></div> */}
        {/* <div class="woolf"></div> */}
        <div className="content-container  mt-10">
          <div className="content">
            <h1>NovelTea Library</h1>
            <hr></hr>
            <h2 className="italic">By: Krishnaraj Thadesar</h2>

            <h3>"NovelTea Library: Where Words Are the Perfect Blend."</h3>

            <p>
              <span>W</span>elcome to NovelTea Library, where the art of reading
              meets the pleasure of sipping the finest teas from around the
              world. Our library is a sanctuary for book lovers and tea
              enthusiasts alike, offering a unique fusion of literary
              exploration and sensory delight.
            </p>
            <hr></hr>
            <p>
              Dive into a world of literary treasures as you explore our
              carefully curated collections. From timeless classics to
              contemporary bestsellers, our library boasts a diverse range of
              books for every palate. Whether you're in the mood for
              heartwarming romance, spine-tingling mysteries, or epic
              adventures, you'll find your next literary obsession here.
            </p>
            <hr></hr>
          </div>
        </div>
      </section>
      <div class="flex justify-center p-4 m-4 flex-col gap-4 items-center">
        <div class="text-5xl outline p-4 rounded-full px-16 text-pink-900">
          Our Collection
        </div>

        <div className="flex rounded-3xl p-8 m-4 mx-16 justify-center flex-wrap">
          {books !== undefined ? (
            books.map((book) => <Book key={book._id} book={book} />)
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
