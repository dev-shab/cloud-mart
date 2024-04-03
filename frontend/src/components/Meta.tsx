import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({
  title = "Welcome to CloudMart",
  description = "We sell the best products for cheap",
  keywords = "electronics",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default Meta;
