import React from "react";
import Navbar from "../../components/navbar/navbar";
import LikeShare from "./likeShare";

const Read = () => {
  return (
    <>
      <Navbar />
      <div className="mt-[5rem] w-[90%] m-auto md:w-[60%] lg:w-[40%] relative ">
        <div>
          <h1 className="text-3xl font-bold">
            Inflation: good for the Economy.
          </h1>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <img
            className="w-11 ml-2 rounded-3xl"
            src="https://lh3.googleusercontent.com/a/ACg8ocJl9pUCeq-rTk3Tsyw5gxlpfoVnMNuBw8gE_ZGM6suIjlc=s96-c"
            alt=""
          />
          <div>
            <h2>Arjun Dangi</h2>
            <p>3 min read sep23</p>
          </div>
        </div>

        <LikeShare />

        <div>
          <img src="" alt="" />
        </div>
        <div>
          <p>
            We all know about inflation. Inflation has an impact on everyone’s
            life. Inflation simply means an increase in the price of things.
            When the price of goods increases, it affects the pockets of the
            people. But can it also happen that people are benefiting from
            inflation? If seen, people also benefit from inflation, but how,
            let’s understand this thing in detail. But before the benefits of
            inflation, let us understand inflation well. What is Inflation?
            Inflation is the rate of increase in prices which can be translated
            as the downfall of purchasing control over time. Prices of a basket
            of selected goods and services can reflect the rate at which
            purchasing power drops. Deflation, on the other hand, occurs when
            prices decline and purchasing power increases. When there is a
            situation of inflation, then the prices of goods increase but when
            there is deflation then the prices of the goods start falling. Now
            it is good to see that due to deflation, there is a decline in the
            prices of goods, that is, now people will start getting goods
            cheaper, but it has a huge impact on the economy of the country.
            Because the fall in the price of goods indicates that the demand for
            goods is decreasing in the economy, people are buying fewer goods.
            Now let us understand with an example how this affects the economy
            of the country. Suppose you are the owner of a clothing factory, now
            in the deflation situation, the price of your clothes is decreasing,
            that is, people are not buying as many clothes as they used to
            before and due to this, you had to reduce the cost of your clothes
            and we do this. It’s called deflation. Now when your clothes are not
            being sold, then it is obvious that you will also reduce your
            production because the goods are not being sold, then what will you
            do even after manufacturing? Now if you reduce making clothes, then
            obviously you will also reduce the people who make them because you
            no longer need so many people, that is, the situation of job loss
            has arisen. So the fall in the price of goods in this manner also
            has a bad effect on the economy of the country. Now let’s talk about
            how people benefit from infection i.e. increase in the price of
            goods. How do people benefit from inflation? Inflation benefits
            those people who have taken a loan to repay a fixed amount. For
            example, took a loan of 5000 from someone of yours and promised him
            that you will pay back 5000 only after 10 years. Now you have
            benefited because when you took your money then the value of 5000
            was more and when you gave back the money then its value decreased.
            Inflation is good for the economy because when people come to know
            that prices are going to rise then they start purchasing more goods,
            and this will create a temporary demand in the economy. Hope you
            guys understand why is inflation good for the economy. And I hope
            you can conclude on your own that inflation is good or bad.
          </p>
        </div>
        <LikeShare />

        {/* suggestions */}
        <div></div>
      </div>
    </>
  );
};

export default Read;
