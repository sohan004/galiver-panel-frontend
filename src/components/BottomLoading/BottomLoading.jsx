import logo from '../../assets/logo/png-02.png'
const BottomLoading = ({ loading }) => {
    return (
        <div className='flex justify-center'>
            {loading && <img className='w-16 bg-white rounded-full shadow-md mt-4 animate-pulse' src={logo} alt="" />}
        </div>
    );
};

export default BottomLoading;