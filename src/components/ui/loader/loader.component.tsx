import { Backdrop, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#ddd", zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};

export default Loader;
