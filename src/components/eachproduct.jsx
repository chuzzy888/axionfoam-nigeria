import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

export const Eachproduct = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [newSize, setNewSize] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (JSON.parse(item?.sizes)?.length > 0) {
      setPrice(JSON.parse(item?.sizes)[0]?.price);
      setSize(
        `${JSON.parse(item?.sizes)[0]?.name} ${
          JSON.parse(item?.sizes)[0]?.width
        } X ${JSON.parse(item?.sizes)[0]?.height} ${
          JSON.parse(item?.sizes)[0]?.unit
        }`
      );
    }
  }, [item]);

  useEffect(() => {
    setSize(newSize);
  }, [newSize]);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="shop-item col-lg-4 col-md-4 col-sm-12">
      <div className="inner-box">
        <div className="image">
          <a>
            <Slider {...settings}>
              {JSON.parse(item.images).map((eachimage) => {
                return (
                  <img
                    src={eachimage}
                    alt=""
                    className="productimage"
                    onClick={() => {
                      navigate(`/products?id=${item.id}`);
                    }}
                  />
                );
              })}
            </Slider>
          </a>
        </div>
        <div
          className="lower-content slate px-2 pb-2 "
          style={{ cursor: "pointer" }}
        >
          <h6
            style={{
              marginTop: "-10px",
              marginBottom: "-20px",
              border: "none",
            }}
            onClick={() => {
              navigate(`/products?id=${item.id}`);
            }}
          >
            <a>{item.name}</a>
          </h6>
          <div
            className="d-flex align-items-center"
            style={{ marginTop: "-10px" }}
          >
            {" "}
            <h4 className="pt-3" style={{ fontSize: "12px", width: "80px" }}>
              Select Size:
            </h4>
            <select
              name=""
              id=""
              style={{
                width: "100%",
              }}
              className="ms-2 mt-3 productSelect"
              // defaultValue={2 + 2}
              onChange={(e) => {
                setNewSize(e.target.value.split("-")[0]);
                setTimeout(() => {
                  console.log(newSize);
                }, 2000);
                setPrice(e.target.value.split("-")[1]);
              }}
            >
              {JSON.parse(item?.sizes).map((eachsize) => {
                return (
                  <option
                    key={eachsize.name}
                    value={`${eachsize.name} ${eachsize.width} X ${
                      eachsize.height
                    } ${eachsize.unit} -${eachsize.price.toLocaleString()}`}
                    className="myoption text-light"
                  >
                    {eachsize.name} {eachsize.width} X {eachsize.height}{" "}
                    {eachsize.unit}
                    {/* {console.log(item.category)} */}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="lower-box " style={{ marginTop: "-30px" }}>
            {/* Select Size */}
            <div className="select-amount clearfix mb-2 ">
              <div className="select-bo">
                <label
                  htmlFor="price"
                  style={{
                    color: "black",
                    border: "1px solid grey",
                    padding: "7px 7px",
                    fontSize: "14px",
                    marginTop: "40px",
                    borderRadius: "13px",
                  }}
                >
                  ₦{price.toLocaleString()}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
