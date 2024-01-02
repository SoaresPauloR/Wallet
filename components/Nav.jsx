"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Nav = () => {
  const { data: session, status } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [hasProviders, setHasProviders] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user && status !== 'loading') {
      router.push("/");
      return;
    }
  }, [session, router, status]);

  useEffect(() => {
    const setUpProviders = async () => {
      if (hasProviders) return;

      const response = await getProviders();

      setProviders(response);
      setHasProviders(true);
    };

    setUpProviders();
  });

  return (
    <nav className="flex-between w-full mb-4 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Wallet</p>
      </Link>

      {/* Mobile Navigation */}
      <div className="flex relative">
        {session?.user ? (
          <div className="flex gap-3">
            {(pathname.indexOf("/new") === -1 && pathname.indexOf("/edit") === -1) ? (
              <Link
                href={`${pathname === "/" ? "/transition" : pathname}/new`}
                className="black_btn"
              >
                Create{" "}
                {pathname === "/" ? "transition" : pathname.replace("/", "")}
              </Link>
            ) : (
              <></>
            )}
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/suggestion"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Suggestions
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
