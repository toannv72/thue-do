import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Payment.module.scss';
import { useParams } from 'react-router-dom';
import ErrorToast from '../Product/ErrorToast';
import moment from 'moment';
import { Button } from '@mui/material';
const cx = classNames.bind(styles);

export default function Payment() {
    const [itemOne, setItemOne] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const url = useParams();
    console.log(url);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URLS}order/getOne/${url.id}`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItemOne(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    throw new Error(error.message);
                },
            )
            .catch((error) => {
                setIsLoaded(true);
                setError(error.message);
            });
    }, [url]);

    if (error) {
        return <ErrorToast message={error.message} />;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <div className={cx('main')}>
                    <div
                        style={{
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            fontSize: 13,
                            margin: '0 auto',
                            padding: 0,
                        }}
                    >
                        <table
                            align="center"
                            border="0"
                            cellPadding="0"
                            cellSpacing="0"
                            style={{
                                padding: 0,
                                borderSpacing: 0,
                                tableLayout: 'fixed',
                                borderCollapse: 'collapse',
                                backgroundColor: '#f5f5f5',
                            }}
                        >
                            <tbody>
                                <tr>
                                    <td style={{ padding: 0, margin: 0 }}>
                                        <table
                                            align="center"
                                            border="0"
                                            cellPadding="0"
                                            cellSpacing="0"
                                            width="600"
                                            style={{ borderCollapse: 'collapse' }}
                                            bgcolor="#ffffff"
                                        >
                                            <tbody>
                                                <tr>
                                                    <td bgcolor="#203467" width="100%" valign="top">
                                                        <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td
                                                                        style={{
                                                                            fontSize: 20,
                                                                            color: '#ffffff',
                                                                            padding: '28 0 0 0',
                                                                            textAlign: 'center',
                                                                        }}
                                                                    >
                                                                        Thông tin đơn hàng
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td
                                                                        style={{
                                                                            fontSize: 14,
                                                                            color: '#ffffff',
                                                                            padding: '10 0 28 0',
                                                                            textAlign: 'center',
                                                                        }}
                                                                    >
                                                                        Mã đơn hàng:{itemOne.id}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <table
                                                            border="0"
                                                            cellPadding="0"
                                                            cellSpacing="0"
                                                            width="100%"
                                                            bgcolor="#ffffff"
                                                        >
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ padding: '0 0 22 0' }} colSpan={2}>
                                                                        <table
                                                                            border="0"
                                                                            cellPadding="0"
                                                                            cellSpacing="0"
                                                                            style={{
                                                                                background: '#f5f5f5',
                                                                                padding: '3 0 0 0',
                                                                                width: '100%',
                                                                            }}
                                                                        >
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td
                                                                                        colSpan={2}
                                                                                        style={{
                                                                                            padding: '30 10 0 30',
                                                                                            fontSize: 12,
                                                                                            color: '#666666',
                                                                                        }}
                                                                                    >
                                                                                        Kính chào Quý khách
                                                                                        <strong
                                                                                            style={{
                                                                                                color: '#333333',
                                                                                            }}
                                                                                        >
                                                                                            {itemOne.name}
                                                                                        </strong>
                                                                                        <br />
                                                                                        <br /> Chân thành cảm ơn Quý
                                                                                        khách đã mua sắm !
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td
                                                                                        colSpan={2}
                                                                                        style={{
                                                                                            padding: '18 10 0 30',
                                                                                            fontSize: 12,
                                                                                            color: '#666666',
                                                                                        }}
                                                                                    >
                                                                                        Đơn hàng của Quý khách hiện đã
                                                                                        được tiếp nhận và sẽ giao đến
                                                                                        địa chỉ nhận hàng trong thời
                                                                                        gian sớm nhất.
                                                                                    </td>
                                                                                </tr>
                                                                                <tr></tr>
                                                                                <tr>
                                                                                    <td
                                                                                        colSpan={2}
                                                                                        style={{
                                                                                            padding: '15 10 0 30',
                                                                                            fontSize: 12,
                                                                                            color: '#666666',
                                                                                        }}
                                                                                    >
                                                                                        Chúng tôi hy vọng Quý khách hài
                                                                                        lòng với trải nghiệm mua sắm và
                                                                                        các sản phẩm đã chọn.
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td
                                                                                        height="1"
                                                                                        width=""
                                                                                        style={{
                                                                                            padding: '15 10 0 30',
                                                                                            margin: 0,
                                                                                        }}
                                                                                    ></td>
                                                                                    <td
                                                                                        width=""
                                                                                        // style="padding:0,margin:0"
                                                                                    ></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td colSpan={2}>
                                                                                        <table
                                                                                            style={{
                                                                                                background: '#fff',
                                                                                                width: '97%',
                                                                                                margin: '0 auto 10',
                                                                                                border: 'solid 1 #e5e5e5',
                                                                                            }}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style={{
                                                                                                            padding:
                                                                                                                '15 20',
                                                                                                        }}
                                                                                                        colSpan={2}
                                                                                                    >
                                                                                                        <strong
                                                                                                            style={{
                                                                                                                color: '#25396c',
                                                                                                                fontSize: 18,
                                                                                                            }}
                                                                                                        >
                                                                                                            Thông tin
                                                                                                            đơn hàng
                                                                                                        </strong>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style={{
                                                                                                            padding:
                                                                                                                '5 20',
                                                                                                        }}
                                                                                                        width="50%"
                                                                                                    >
                                                                                                        <strong
                                                                                                            style={{
                                                                                                                color: '#666666',
                                                                                                                fontSize: 12,
                                                                                                            }}
                                                                                                        >
                                                                                                            Mã đơn hàng
                                                                                                        </strong>
                                                                                                    </td>
                                                                                                    <td
                                                                                                        style={{
                                                                                                            padding:
                                                                                                                '5 20',
                                                                                                        }}
                                                                                                        width="50%"
                                                                                                    >
                                                                                                        <strong
                                                                                                            style={{
                                                                                                                color: '#333333',
                                                                                                                fontSize: 12,
                                                                                                            }}
                                                                                                        >
                                                                                                            7119538441
                                                                                                        </strong>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style={{
                                                                                                            padding:
                                                                                                                '5 20',
                                                                                                        }}
                                                                                                        width="50%"
                                                                                                    >
                                                                                                        <strong
                                                                                                            style={{
                                                                                                                color: '#666666',
                                                                                                                fontSize: 12,
                                                                                                            }}
                                                                                                        >
                                                                                                            Ngày đặt
                                                                                                            hàng
                                                                                                        </strong>
                                                                                                    </td>
                                                                                                    <td
                                                                                                        style={{
                                                                                                            padding:
                                                                                                                '5 20',
                                                                                                        }}
                                                                                                        width="50%"
                                                                                                    >
                                                                                                        <strong
                                                                                                            style={{
                                                                                                                color: '#333333',
                                                                                                                fontSize: 12,
                                                                                                            }}
                                                                                                        >
                                                                                                            20/11/2017
                                                                                                        </strong>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td colSpan={2}>
                                                                                        <table
                                                                                            style={{
                                                                                                background: '#fff',
                                                                                                width: '97%',
                                                                                                margin: '0 auto',
                                                                                                border: 'solid 1 #e5e5e5',
                                                                                            }}
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style={{
                                                                                                            padding:
                                                                                                                '15 20',
                                                                                                        }}
                                                                                                        colSpan={2}
                                                                                                    >
                                                                                                        <strong
                                                                                                            style={{
                                                                                                                color: '#25396c',
                                                                                                                fontSize: 18,
                                                                                                            }}
                                                                                                        >
                                                                                                            Đơn hàng chi
                                                                                                            tiết
                                                                                                        </strong>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        colSpan={2}
                                                                                                        style={{
                                                                                                            padding:
                                                                                                                '0 10',
                                                                                                        }}
                                                                                                    >
                                                                                                        <table>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            borderBottom:
                                                                                                                                '#e3e3e3 1 solid',
                                                                                                                            padding:
                                                                                                                                '0 10 10 10',
                                                                                                                            color: '#666666',
                                                                                                                        }}
                                                                                                                        width="40%"
                                                                                                                    >
                                                                                                                        <strong>
                                                                                                                            Sản
                                                                                                                            phẩm
                                                                                                                        </strong>
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            borderBottom:
                                                                                                                                '#e3e3e3 1 solid',
                                                                                                                            padding:
                                                                                                                                '0 10 10 10',
                                                                                                                            color: '#666666',
                                                                                                                        }}
                                                                                                                        width="20%"
                                                                                                                    >
                                                                                                                        <strong>
                                                                                                                            Ngày
                                                                                                                            thuê
                                                                                                                        </strong>
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            borderBottom:
                                                                                                                                '#e3e3e3 1 solid',
                                                                                                                            padding:
                                                                                                                                '0 10 10 10',
                                                                                                                            color: '#666666',
                                                                                                                        }}
                                                                                                                        width="20%"
                                                                                                                    >
                                                                                                                        <strong>
                                                                                                                            Ngày
                                                                                                                            trả
                                                                                                                        </strong>
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style={{
                                                                                                                            borderBottom:
                                                                                                                                '#e3e3e3 1 solid',
                                                                                                                            padding:
                                                                                                                                '0 10 10 10',
                                                                                                                            color: '#666666',
                                                                                                                        }}
                                                                                                                        width="20%"
                                                                                                                    >
                                                                                                                        <strong>
                                                                                                                            Tổng
                                                                                                                            cộng
                                                                                                                            (VNĐ)
                                                                                                                        </strong>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        // style="HEIGHT:5"
                                                                                                                        colSpan={
                                                                                                                            2
                                                                                                                        }
                                                                                                                    ></td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        // style={{:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,PADDING-TOP:10}}
                                                                                                                        bgcolor="#f6f6f6"
                                                                                                                        width="40%"
                                                                                                                        align="left"
                                                                                                                    >
                                                                                                                        {itemOne.orderDetails
                                                                                                                            ? itemOne
                                                                                                                                  .orderDetails[0]
                                                                                                                                  .product
                                                                                                                                  .name
                                                                                                                            : ''}
                                                                                                                    </td>

                                                                                                                    <td
                                                                                                                        // style="PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,PADDING-TOP:10"
                                                                                                                        bgcolor="#f6f6f6"
                                                                                                                        width="20%"
                                                                                                                        align="left"
                                                                                                                    >
                                                                                                                        {itemOne.orderDetails
                                                                                                                            ? moment(
                                                                                                                                  itemOne
                                                                                                                                      .orderDetails[0]
                                                                                                                                      .orderReturnDate,
                                                                                                                              ).format(
                                                                                                                                  'YYYY-MM-DD',
                                                                                                                              )
                                                                                                                            : ''}
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        // style="PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,PADDING-TOP:10"
                                                                                                                        bgcolor="#f6f6f6"
                                                                                                                        width="20%"
                                                                                                                        align="left"
                                                                                                                    >
                                                                                                                        {itemOne.orderDetails
                                                                                                                            ? moment(
                                                                                                                                  itemOne
                                                                                                                                      .orderDetails[0]
                                                                                                                                      .orderBorrowDate,
                                                                                                                              ).format(
                                                                                                                                  'YYYY-MM-DD',
                                                                                                                              )
                                                                                                                            : ''}
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        // style="PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,PADDING-TOP:10"
                                                                                                                        bgcolor="#f6f6f6"
                                                                                                                        width="20%"
                                                                                                                        align="right"
                                                                                                                    >
                                                                                                                        {/* {itemOne.totalPrice.toLocaleString(
                                                                                                                                            'vi-VN',
                                                                                                                                        )} */}
                                                                                                                        {itemOne.orderDetails
                                                                                                                            ? (
                                                                                                                                  itemOne.totalPrice -
                                                                                                                                  itemOne
                                                                                                                                      .orderDetails[0]
                                                                                                                                      .deposit
                                                                                                                              ).toLocaleString(
                                                                                                                                  'vi-VN',
                                                                                                                              )
                                                                                                                            : ''}

                                                                                                                        đ
                                                                                                                    </td>
                                                                                                                </tr>

                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        // style="HEIGHT:5"
                                                                                                                        colSpan={
                                                                                                                            2
                                                                                                                        }
                                                                                                                    ></td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        // style="BORDER-BOTTOM:#e3e3e3 1 solid,PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,BORDER-TOP:#666666 1 dashed,FONT-WEIGHT:bold,PADDING-TOP:10"
                                                                                                                        colSpan={
                                                                                                                            2
                                                                                                                        }
                                                                                                                        align="left"
                                                                                                                    >
                                                                                                                        Số
                                                                                                                        tiền
                                                                                                                        cọc
                                                                                                                        sản
                                                                                                                        phẩm
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        // style="BORDER-BOTTOM:#e3e3e3 1 solid,PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,BORDER-TOP:#666666 1 dashed,PADDING-TOP:10"
                                                                                                                        colSpan={
                                                                                                                            2
                                                                                                                        }
                                                                                                                        align="right"
                                                                                                                    >
                                                                                                                        {itemOne.orderDetails
                                                                                                                            ? itemOne.orderDetails[0].deposit.toLocaleString(
                                                                                                                                  'vi-VN',
                                                                                                                              )
                                                                                                                            : ''}

                                                                                                                        đ
                                                                                                                    </td>
                                                                                                                </tr>

                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        // style="BORDER-BOTTOM:#e3e3e3 1 solid,PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,BORDER-TOP:#666666 1 dashed,FONT-WEIGHT:bold,PADDING-TOP:10"
                                                                                                                        colSpan={
                                                                                                                            2
                                                                                                                        }
                                                                                                                        align="left"
                                                                                                                    >
                                                                                                                        Tổng
                                                                                                                        tiền
                                                                                                                        đơn
                                                                                                                        hàng
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        // style="BORDER-BOTTOM:#e3e3e3 1 solid,PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,BORDER-TOP:#666666 1 dashed,PADDING-TOP:10"
                                                                                                                        colSpan={
                                                                                                                            2
                                                                                                                        }
                                                                                                                        align="right"
                                                                                                                    >
                                                                                                                        {itemOne.totalPrice
                                                                                                                            ? itemOne.totalPrice.toLocaleString(
                                                                                                                                  'vi-VN',
                                                                                                                              )
                                                                                                                            : ''}

                                                                                                                        đ
                                                                                                                    </td>
                                                                                                                </tr>

                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        // style="BORDER-BOTTOM:#e3e3e3 1 solid,PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:13,FONT-WEIGHT:bold,PADDING-TOP:10"
                                                                                                                        bgcolor="#fffbe2"
                                                                                                                        colSpan={
                                                                                                                            2
                                                                                                                        }
                                                                                                                        align="left"
                                                                                                                    >
                                                                                                                        Số
                                                                                                                        tiền
                                                                                                                        còn
                                                                                                                        lại
                                                                                                                        cần
                                                                                                                        thanh
                                                                                                                        toán
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        // style="BORDER-BOTTOM:#e3e3e3 1 solid,PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,PADDING-TOP:10"
                                                                                                                        bgcolor="#fffbe2"
                                                                                                                        colSpan={
                                                                                                                            2
                                                                                                                        }
                                                                                                                        align="right"
                                                                                                                    >
                                                                                                                        {itemOne.totalPrice
                                                                                                                            ? itemOne.totalPrice.toLocaleString(
                                                                                                                                  'vi-VN',
                                                                                                                              )
                                                                                                                            : ''}

                                                                                                                        đ
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        // style="BORDER-BOTTOM:#e3e3e3 1 solid,PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,FONT-WEIGHT:bold,PADDING-TOP:10"
                                                                                                                        colSpan={
                                                                                                                            2
                                                                                                                        }
                                                                                                                        align="left"
                                                                                                                    >
                                                                                                                        Hình
                                                                                                                        thức
                                                                                                                        thanh
                                                                                                                        toán{' '}
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        // style="BORDER-BOTTOM:#e3e3e3 1 solid,PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,PADDING-TOP:10"
                                                                                                                        colSpan={
                                                                                                                            2
                                                                                                                        }
                                                                                                                        align="right"
                                                                                                                    >
                                                                                                                        Thanh
                                                                                                                        toán
                                                                                                                        khi
                                                                                                                        nhận
                                                                                                                        hàng
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        // style="PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,FONT-WEIGHT:bold,PADDING-TOP:10"
                                                                                                                        colSpan={
                                                                                                                            2
                                                                                                                        }
                                                                                                                        align="left"
                                                                                                                    >
                                                                                                                        Tình
                                                                                                                        trạng
                                                                                                                        thanh
                                                                                                                        toán{' '}
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        // style="PADDING-BOTTOM:10,PADDING-LEFT:10,PADDING-RIGHT:10,COLOR:#666666,FONTSIZE:12,PADDING-TOP:10"
                                                                                                                        colSpan={
                                                                                                                            2
                                                                                                                        }
                                                                                                                        align="right"
                                                                                                                    >
                                                                                                                        Chưa
                                                                                                                        hoàn
                                                                                                                        tất
                                                                                                                        thanh
                                                                                                                        toán
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr></tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={cx('swal-footer')}>
                    <Button
                        style={{ background: '#fe2c55', color: 'white', marginLeft: '60%', fontSize: 10, padding: 20 }}
                    >
                        Tiếp tục mua thuê đồ
                    </Button>
                </div>
            </>
        );
    }
}
