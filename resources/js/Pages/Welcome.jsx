import { Link, Head } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen dark:bg-gray-900 selection:bg-indigo-500 selection:text-white ">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-indigo-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-indigo-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route("register")}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
                <section className=" bg-gray-800 px-5 py-20 sm:m-0 sm:p-20 rounded-md flex-col sm:flex-row items-center flex gap-6 sm:gap-5 m-auto ">
                    <ApplicationLogo className="big-logo w-[150px] sm:w-[100px] h-auto stroke-current text-indigo-500 fill-current " />
                    <div className="flex flex-col gap-3 sm:gap-1 flex-auto">
                        <h1 className="text-6xl text-center sm:text-left sm:text-5xl font-bold text-indigo-500">
                            Stickly
                        </h1>
                        <p className="text-indigo-100 text-2xl sm:text-xl text-center sm:text-left">
                            Helping tasks stick in your mind
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
