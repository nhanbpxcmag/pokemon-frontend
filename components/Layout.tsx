import Head from "next/head";
import PropTypes from "prop-types";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

export type Props = {
  children: ReactNode | undefined;
  title?: string;
};
const Layout = (props: Props) => {
  const { children, title } = props;
  return (
    <div className="mx-auto">
      <Head>
        <title>{title}</title>
        <meta name="description" content="pokemon wiki" />
        <meta name="description" content="Danh sách pokemon" />
        <meta name="description" content="Danh sách Pokémon" />
        <meta name="description" content="pokeapi" />
        <meta name="description" content="pokemon" />
        <meta name="description" content="pikachu" />
        <meta name="description" content="Pokédex" />
        <meta name="description" content="Pokémon" />
        <meta name="description" content="Pokémon wiki" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/icons/pokeball.png" />
      </Head>
      <div className="main">
        {/* <div className="fixed h-screen w-screen -z-10">
          <Image alt="Mountains" src="/images/bg-img.jpg" layout="fill" objectFit="cover" quality={100} />
        </div> */}
        <Header />
        <main className="px-3 py-2 container mx-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};
Layout.defaultProps = {
  title: "Pokemon Wiki",
};

export default Layout;
