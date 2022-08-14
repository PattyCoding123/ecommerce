import { React, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus,
AiFillStar, AiOutlineStar } from 'react-icons/ai'

import { client, urlFor } from '../../lib/client'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'
/* 
  ProductDetails page will be rendered when the user
  clicks an item as the products contain a unique 
  "slug" that includes "/product/{slug}" in the Link
  component for Next.js, and this page component is being 
  contained in the /product/ directory.

  - Notice that the name of the file is [slug].js, so
  we can use the "slug" as a variable in our functions
  below since it is dynamic.


  This is the functionality of page-based routing.

  Also, pass in the props we will get from our getStaticProps
  function.
*/
const ProductDetails = ({ itemData, productsData }) => {
  const { image, name, details, price } = itemData

  /*
    We will have a state called index which controls what image 
    we are currently displaying in full size from the array of
    images that comes with the product.

    Additionally, we will use the quantity state and 
    the decrease/increase quantity event handlers from
    our global state context.
  */
  const [index, setIndex] = useState(0)
  const { decreaseQty, increaseQty, quantity, onAdd } = useStateContext();

  return (
    <>
      {/*
        The following div will contain all the elements necessary for displaying 
        the product's details such as the picture and information.
        
        The first element will be a div that contains 2 main divs that displays images.
        
          The first nested div is a "main image" div that displays the currently selected
          view of the product.

          The second nested div acts a mini display of the other views of the product
          which are smaller in size.

        The second element will be a div that holds all the textual information
        of the product including description, price, and buttons for purchasing
        the item.
      */}
      <div className="product__detail-container">
        <div>
          <div className="image__container">
              <img src={urlFor(image && image[index])} className="product__detail-image"/>
          </div>

          <div
            className="small__images-container"
          >
            {/*
              For each small image, we will give each 
            */}
            {image?.map((item, i) => (
              <img 
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        {/*
          The following div will contain all the necessary elements needed to display the
          product's information and the functionalities for buying the item such
          as a quantity changer and purchase buttons.
        */}
        <div className="product__detail-description">
          <h1>{name}</h1>

          {/*
            The following div contains another div that houses all
            the star icons and a <p> element to contain the number of reviews.
          */}
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <AiOutlineStar />
            </div>
            <p>(1000)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>

          {/*
            The quantity div is a container that houses an <h3> 
            and <p> element. The <p> element contains 3 spans
            that represent a quantity and two state incrementers
            to increment the number of items the user wants to buy.

            It includes a <p> that has 3 spans. Two are icons, and
            one of them displays the quantity of the item we want to add.
          */}
          <div className="quantity">
            <h3>Quantity</h3>

            {/*
              For the 'minus' and 'plus' span, assign an onClick event attribute
              and pass the decreaseQty and increaseQty event handler functions
              respectfully. 

              For the 'num' span, display the 'quantity' state from our
              state context.
            */}
            <p className="quantity__description">
              <span className="minus" onClick={decreaseQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">
                {quantity}
              </span>
              <span className="plus" onClick={increaseQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          {/*
            The buttons div is a container that houses two buttons
            which will allow the user to add an item to their cart,
            or to buy the item right away and take them to the 
            purchasing screen.

            The add-to-cart button will have an onClick attribute which
            passes a callback function to invoke the onAdd handler
            which will add the current item into the cart.
          */}
          <div className="buttons">
            <button 
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(itemData, quantity)}
            >
              Add to Cart
            </button>
            <button 
              type="button"
              className="buy-now"
              onClick=""
            >
              Buy Now!
            </button>
          </div>
        </div>
      </div>

      {/*
        The following div is placed outside the "product__details-container"
        div as it meant to house another div that contains all the suggested items.

        It will appear below everything in the "product__details-container"
      */}
      <div
        className="maylike-products-wrapper"
      >
        <h2>You may also like: </h2>

        {/*
          The following div will contain a mapping of Product components
          similar to the ones found on the homepage. We will use the array of
          products that is returned from the getStaticProps 
        */}
        <div
          className="maylike-products-container"
        >
          {productsData.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}

// Generate all Static Paths as this component
// includes dynamic routes while using getStaticProps.
export const getStaticPaths = async () => {

  // Make a query for all product slugs.
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`

  // Fetch all slugs and store them in an array.
  const products = await client.fetch(query)

  // For each slug, return an object that has a object member
  // called "params" which contains a member for the product's slug.
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }))
  
  return {
    paths,
    fallback: 'blocking'
  }
}

/* 
  This getStaticProps method will allow Next.js to pre-render the page at 
  build time using the props returned from this function.
*/
export const getStaticProps = async ({ params: { slug } }) => {
  // For the product query, only return the first element that matches the query.
  const itemQuery = `*[_type == "product" && slug.current == '${slug}'][0]`
  const itemData = await client.fetch(itemQuery)
  const productsQuery = '*[_type == "product"]'
  const productsData = await client.fetch(productsQuery)

  return {
    props: { itemData, productsData }
  }
}
export default ProductDetails