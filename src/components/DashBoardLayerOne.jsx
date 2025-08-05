import React, { useEffect } from 'react'
import SalesStatisticOne from '../components/SalesStatisticOne';
import UsersOverviewOne from '../components/UsersOverviewOne';
import ClientInvoiceList from '../components/ClientInvoiceList';
import UnitCountOne from '../components/UnitCountOne';
import UsersOverviewTwo from '../components/UsersOverviewTwo';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchClients } from '../store/slices/clientSlice';
import { fetchInvoices } from '../store/slices/invoiceSlice';

const DashBoardLayerOne = () => {
    const dispatch = useDispatch();
    const { invoices } = useSelector((state) => state.invoices);
    const { clients } = useSelector((state) => state.clients);
    useEffect(() => {
        dispatch(fetchClients());
    }, []);

    useEffect(() => {
        dispatch(fetchInvoices());
    }, []);
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
                <ClientInvoiceList />

            </section>
        </>


    )
}

export default DashBoardLayerOne