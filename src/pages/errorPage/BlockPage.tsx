
import React from 'react';

function BlockPage() {
    return (
        <div className="w-full mt-12 flex items-center justify-center">
            <div className="max-w-4xl mx-auto   rounded-lg p-6">
                <div className="text-center flex flex-col gap-6">
                    <h1 className="text-7xl font-bold -500 mb-4"> Oops! 🚧</h1>
                    <p className="text-xl w-full text-neutral-500 mb-6">
                        It looks like you don’t have access to this page.  Please reach out to the project Lead to get back on track. They’ll help you get the access you need! 🔑
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BlockPage;
