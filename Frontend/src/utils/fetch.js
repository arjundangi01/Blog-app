import axios from "axios";

export const fetchBlog = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/blogs?q=${id}`
    );
    // console.log(response.data[0]);
    //   setBlog(response.data[0]);
    const date = new Date(response.data[0].createdAt);

    // Get the day and month names
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    //   setTime({ day, month });
    //     setIsLoadingState(false);

    return { blog: response.data[0], day, month };
  } catch (error) {
    console.log(error);
  }
};
