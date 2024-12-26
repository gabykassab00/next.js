import Clients from "@/components/Clients";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Update from "@/components/Update";
import Workflow from "@/components/Workflow";

export default function Home() {
  return (
    <>
    <Hero></Hero>
    <Workflow></Workflow>
    <Update></Update>
    <Clients></Clients>
    <Footer></Footer>
    </>
  );
}
