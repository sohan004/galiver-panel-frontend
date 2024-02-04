import { MdOutlineShoppingCart } from "react-icons/md";
import { GrShop } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { LuBadgeDollarSign } from "react-icons/lu";
import Chart from "react-google-charts";

const Dashboard = () => {

    const data = [
        ["Month", "Sales", "Expenses", "Profit"],
        ["2014", 1000, 400, 2000],
        ["2015", 1170, 460, 250],
        ["2016", 660, 1120, 300],
        ["2017", 1030, 540, 350],
    ];

    const data2 = [
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7],
    ];

    const data3 = [
        [
            "Day",
            "Guardians of the Galaxy",
            "The Avengers",
            "Transformers: Age of Extinction",
        ],
        [1, 37.8, 80.8, 41.8],
        [2, 30.9, 69.5, 32.4],
        [3, 25.4, 57, 25.7],
        [4, 11.7, 18.8, 10.5],
        [5, 11.9, 17.6, 10.4],
        [6, 8.8, 13.6, 7.7],
        [7, 7.6, 12.3, 9.6],
        [8, 12.3, 29.2, 10.6],
        [9, 16.9, 42.9, 14.8],
        [10, 12.8, 30.9, 11.6],
        [11, 5.3, 7.9, 4.7],
        [12, 6.6, 8.4, 5.2],
        [13, 4.8, 6.3, 3.6],
        [14, 4.2, 6.2, 3.4],
    ];


    const options = {
        chart: {
            title: "Company Performance",
        },
    };

    return (
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-4   gap-3 md:gap-7">
                <div className="bg-white shadow-md p-2 md:p-4 rounded-md flex flex-col items-center">
                    <MdOutlineShoppingCart className="text-4xl md:text-5xl  bg-slate-300 text-slate-500 p-2 rounded-full h-10 w-10 md:w-12 md:h-12 flex items-center justify-center" />
                    <p className="text-xl md:text-2xl font-semibold mt-2">560</p>
                    <p className="text-sm  opacity-75">Total Products</p>
                </div>
                <div className="bg-white shadow-md p-2 md:p-4 rounded-md flex flex-col items-center">
                    <GrShop className="text-4xl md:text-5xl  bg-slate-300 text-slate-500 p-2 rounded-full h-10 w-10 md:w-12 md:h-12 flex items-center justify-center" />
                    <p className="text-xl md:text-2xl font-semibold mt-2">211</p>
                    <p className="text-sm  opacity-75">Total Orders</p>
                </div>
                <div className="bg-white shadow-md p-2 md:p-4 rounded-md flex flex-col items-center">
                    <FaRegUser className="text-4xl md:text-5xl  bg-slate-300 text-slate-500 p-2 rounded-full h-10 w-10 md:w-12 md:h-12 flex items-center justify-center" />
                    <p className="text-xl md:text-2xl font-semibold mt-2">1200</p>
                    <p className="text-sm  opacity-75">Total Users</p>
                </div>
                <div className="bg-white shadow-md p-2 md:p-4 rounded-md flex flex-col items-center">
                    <LuBadgeDollarSign className="text-4xl md:text-5xl  bg-slate-300 text-slate-500 p-2 rounded-full h-10 w-10 md:w-12 md:h-12 flex items-center justify-center" />
                    <p className="text-xl md:text-2xl font-semibold mt-2">$560</p>
                    <p className="text-sm  opacity-75">Total Income</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2   gap-5 md:gap-7 mt-5 md:mt-10">
                <div className="bg-white h-[300px] md:h-[450px] shadow-md p-2 md:p-4 rounded-md">
                    <Chart
                        chartType="Bar"
                        width="100%"
                        height="100%"
                        position="relative"
                        data={data}
                        options={options}
                    />
                </div>
                <div className="bg-white h-[300px] md:h-[450px] shadow-md p-2 md:p-4 rounded-md">
                    <Chart
                        chartType="AreaChart"
                        position="relative"
                        width="100%"
                        height="100%"
                        data={data}
                        options={options}
                    />
                </div>
                <div className="bg-white h-[300px] md:h-[450px] shadow-md p-2 md:p-4 rounded-md">
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width="100%"
                        position="relative"
                        height="100%"
                    />
                </div>
                <div className="bg-white h-[300px] md:h-[450px] shadow-md p-2 md:p-4 rounded-md">
                    <Chart
                        chartType="Line"
                        width="100%"
                        position="relative"
                        height="100%"
                        data={data}
                        options={options}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;