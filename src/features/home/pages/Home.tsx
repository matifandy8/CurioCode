import { CuriosityList } from '../components/CuriosityList';

const HomePage: React.FC = () => {


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold font-jetbrains-mono"><span className="text-cyan-300">[</span>CurioCode<span className="text-cyan-300">]</span></h1>
      <p className="text-gray-300 p-4">Explore fascinating programming facts and improve your coding knowledge!</p>
      <section className="mt-6 p-4">
        <h2 className="text-2xl font-bold p-4">Programming curiosities</h2>
        <CuriosityList />
      </section>
    </div>
  );
};

export default HomePage;
