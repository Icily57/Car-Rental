const Contact = () => {
    return (
        <>
            <div className="bg-gray-300 text-black flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
                <p className="text-center text-3xl font-bold md:text-5xl md:leading-10">
                    Love to hear from you
                </p>
                <p className="mx-auto text-xl max-w-4xl text-center">
                    For any inquiries, complaints or suggestions <br /> please feel free to reach out to us.
                </p>
            </div>
            <div className="bg-base-200 text-white mx-auto max-w-7xl py-12 md:py-24">
                <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
                    {/* Contact Form */}
                    <div className="flex items-center justify-center">
                        <div className="px-2 md:px-12">
                            <p className="text-2xl font-bold md:text-4xl">Get in touch</p>
                            <p className="mt-4 text-lg">
                                Our friendly team would love to hear from you.
                            </p>
                            <form action="" className="mt-8 space-y-4">
                                <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                                    <div className="grid w-full items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none"
                                            htmlFor="first_name"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            id="first_name"
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none"
                                            htmlFor="last_name"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            id="last_name"
                                        />
                                    </div>
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <label
                                        className="text-sm font-medium leading-none"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        id="email"
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <label
                                        className="text-sm font-medium leading-none"
                                        htmlFor="phone_number"
                                    >
                                        Phone number
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="tel"
                                        id="phone_number"
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <label
                                        className="text-sm font-medium leading-none"
                                        htmlFor="message"
                                    >
                                        Ticket
                                    </label>
                                    <textarea
                                        className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        id="message"
                                        cols={3}
                                    />
                                </div>
                                <button type="button" className="w-full btn btn-outline btn-primary">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* <img
                        alt="Contact us"
                        className="hidden max-h-full w-full rounded-lg object-cover lg:block"
                        src="./assets/benefit-one.png"
                    /> */}
                </div>
            </div>
            <hr className="mt-6" />
        </>
    );
};

export default Contact;
