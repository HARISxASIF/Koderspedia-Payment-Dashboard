import React from 'react'
import SalesStatisticOne from './child/SalesStatisticOne';
import TotalSubscriberOne from './child/TotalSubscriberOne';
import UsersOverviewOne from './child/UsersOverviewOne';
import ClientInvoiceList from './child/ClientInvoiceList';
import TopPerformerOne from './child/TopPerformerOne';
import TopCountries from './child/TopCountries';
import GeneratedContent from './child/GeneratedContent';
import UnitCountOne from './child/UnitCountOne';
import UsersOverviewTwo from './child/UsersOverviewTwo';
import DynamicTable from './child/DynamicTable';

const DashBoardLayerOne = () => {

    return (
        <>
            {/* UnitCountOne */}
            <UnitCountOne />

            <section className="row gy-4 mt-1">

                {/* SalesStatisticOne */}
                <SalesStatisticOne />

                {/* UsersOverviewOne */}
                <UsersOverviewOne />

                <UsersOverviewTwo />

                {/* LatestRegisteredOne */}
                <ClientInvoiceList/>

            </section>
        </>


    )
}

export default DashBoardLayerOne