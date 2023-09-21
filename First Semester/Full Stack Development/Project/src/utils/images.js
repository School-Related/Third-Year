import image01 from "../assets/img/vault_images/01.jpg";
import image02 from "../assets/img/vault_images/02.jpg";
import image03 from "../assets/img/vault_images/03.jpg";
import image04 from "../assets/img/vault_images/04.jpg";
import image05 from "../assets/img/vault_images/05.jpg";
import image06 from "../assets/img/vault_images/06.jpg";
import image07 from "../assets/img/vault_images/07.jpg";
import image08 from "../assets/img/vault_images/08.jpg";
import image09 from "../assets/img/vault_images/09.jpeg";
import image10 from "../assets/img/vault_images/10.jpeg";
import image11 from "../assets/img/vault_images/11.jpeg";
import image12 from "../assets/img/vault_images/12.jpg";
import image13 from "../assets/img/vault_images/13.jpg";
import image14 from "../assets/img/vault_images/14.jpg";
import image15 from "../assets/img/vault_images/15.jpg";
import image16 from "../assets/img/vault_images/16.jpg";
import image17 from "../assets/img/vault_images/17.jpg";
import image18 from "../assets/img/vault_images/18.jpg";
import image19 from "../assets/img/vault_images/18.jpg";
const images = [
  {
    id: 1,
    image: image01,
  },
  {
    id: 2,
    image: image02,
  },
  {
    id: 3,
    image: image03,
  },
  {
    id: 4,
    image: image04,
  },
  {
    id: 5,
    image: image05,
  },
  {
    id: 6,
    image: image06,
  },
  {
    id: 7,
    image: image07,
  },
  {
    id: 8,
    image: image08,
  },
  {
    id: 9,
    image: image09,
  },
  {
    id: 10,
    image: image10,
  },
  {
    id: 11,
    image: image11,
  },
  {
    id: 12,
    image: image12,
  },
  {
    id: 13,
    image: image13,
  },
  {
    id: 14,
    image: image14,
  },
  {
    id: 15,
    image: image15,
  },
  {
    id: 16,
    image: image16,
  },
  {
    id: 17,
    image: image17,
  },
  {
    id: 18,
    image: image18,
  },
  {
    id: 19,
    image: image19,
  },
];

export default function select_image() {
  const random_image = images[Math.floor(Math.random() * images.length)];
  return random_image;
}
