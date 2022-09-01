import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { keys } from "@material-ui/core/styles/createBreakpoints";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;


const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
  background-color:#fcf5f5;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;
const Review = styled.p`
  margin: 20px 50px;
  font-size: 20px;
  font-weight: 200;
  font-family: Arial, Helvetica, sans-serif;

    margin-bottom:20px;
  color:DimGrey;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;



const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;
const FilterReview = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterReviewOption = styled.option``;


const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);
  setTimeout(function() {
    if (product.review){
  Object.keys(product.review).map(key => console.log(key))
    }
    else{
        console.log('false')
    }
  },5000);
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  

  const handleClick = () => {
    dispatch(
      addProduct({ ...product, quantity, color, size })
    );
  };
  return (
    // <Container>
    //   <Navbar />
    //   <Announcement />
    //   <Wrapper>
        <InfoContainer>
          <Title>REVIEWS</Title>
          <Price>
            {(()=>{
                if (product.review){
                    return(
                    <Review>
                    {Object.keys(product.review)?.map(key => <h3>{key} :- {product.review[key]}</h3>)}
                    </Review>
                    )
                }
                else{
                    console.log('no obj..')

                }
            })()}</Price>
          
          {/* <Filter>
              <FilterReview onChange={(e) => setSize(e.target.value)}>
                {product.review?.map((s) => (
                  <FilterReviewOption key={s}>{s}</FilterReviewOption>
                ))}
              </FilterReview>
            </Filter> */}
            
          {/* <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer> */}
        </InfoContainer>


    //   </Wrapper>
    //   <Newsletter></Newsletter>
    //   <Footer />
    // </Container>
  );
};

export default Product;
