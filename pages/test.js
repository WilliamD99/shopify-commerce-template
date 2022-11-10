import React, { useState, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import { gsap, encryptText } from '../utils/utils'
import useCheckoutCreate from '../utils/hooks/useCheckoutCreate'
import { Flip } from 'gsap/dist/Flip'
import TextField from '@mui/material/TextField'
import SingleProduct from '../components/Shop/single-product'
import Accordion from '../components/ProductDetails/accordion'

export default function Test() {
    const [open, setOpen] = useState(false)
    const data =
        [
            {
                "cursor": "eyJsYXN0X2lkIjo3Mjc4NzY5OTk1OTU2LCJsYXN0X3ZhbHVlIjoiNzI3ODc2OTk5NTk1NiJ9",
                "node": {
                    "id": "gid://shopify/Product/7278769995956",
                    "title": "Test Product",
                    "handle": "test-product",
                    "vendor": "Company 123",
                    "metafields": [
                        {
                            "value": "Bubble"
                        },
                        {
                            "value": "[\"gid://shopify/Product/7289148735668\",\"gid://shopify/Product/7288095244468\"]"
                        }
                    ],
                    "collections": {
                        "edges": [
                            {
                                "node": {
                                    "title": "Test collection",
                                    "id": "gid://shopify/Collection/291968286900"
                                }
                            },
                            {
                                "node": {
                                    "title": "Price Drop",
                                    "id": "gid://shopify/Collection/292133208244"
                                }
                            }
                        ]
                    },
                    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "featuredImage": {
                        "url": "/placeholder.webp"
                    },
                    "priceRange": {
                        "minVariantPrice": {
                            "amount": "40.0"
                        },
                        "maxVariantPrice": {
                            "amount": "50.0"
                        }
                    },
                    "totalInventory": 600,
                    "tags": [
                        "Camera",
                        "cool"
                    ],
                    "productType": "Electronics",
                    "variants": {
                        "edges": [
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/41925953552564",
                                    "compareAtPrice": null,
                                    "price": "50.00"
                                }
                            },
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/41925953585332",
                                    "compareAtPrice": "60.00",
                                    "price": "40.00"
                                }
                            },
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/41925953618100",
                                    "compareAtPrice": "60.00",
                                    "price": "50.00"
                                }
                            },
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/41925953650868",
                                    "compareAtPrice": "60.00",
                                    "price": "50.00"
                                }
                            },
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/41925953683636",
                                    "compareAtPrice": "60.00",
                                    "price": "50.00"
                                }
                            }
                        ]
                    }
                }
            },
            {
                "cursor": "eyJsYXN0X2lkIjo3Mjg4MDk1MjQ0NDY4LCJsYXN0X3ZhbHVlIjoiNzI4ODA5NTI0NDQ2OCJ9",
                "node": {
                    "id": "gid://shopify/Product/7288095244468",
                    "title": "Just Another Test",
                    "handle": "just-another-test",
                    "vendor": "Garden Gate",
                    "metafields": [
                        {
                            "value": "Dropdown"
                        },
                        {
                            "value": "[\"gid://shopify/Product/7278769995956\"]"
                        }
                    ],
                    "collections": {
                        "edges": [
                            {
                                "node": {
                                    "title": "Test collection",
                                    "id": "gid://shopify/Collection/291968286900"
                                }
                            },
                            {
                                "node": {
                                    "title": "Manual Collection",
                                    "id": "gid://shopify/Collection/292016226484"
                                }
                            },
                            {
                                "node": {
                                    "title": "Price Drop",
                                    "id": "gid://shopify/Collection/292133208244"
                                }
                            }
                        ]
                    },
                    "description": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
                    "featuredImage": {
                        "url": "/placeholder.webp"
                    },
                    "priceRange": {
                        "minVariantPrice": {
                            "amount": "50.0"
                        },
                        "maxVariantPrice": {
                            "amount": "50.0"
                        }
                    },
                    "totalInventory": 35,
                    "tags": [],
                    "productType": "Disposable",
                    "variants": {
                        "edges": [
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/41945386713268",
                                    "compareAtPrice": "60.00",
                                    "price": "50.00"
                                }
                            },
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/41945386746036",
                                    "compareAtPrice": null,
                                    "price": "50.00"
                                }
                            },
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/41945386778804",
                                    "compareAtPrice": null,
                                    "price": "50.00"
                                }
                            },
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/41945386811572",
                                    "compareAtPrice": null,
                                    "price": "50.00"
                                }
                            },
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/41945386844340",
                                    "compareAtPrice": null,
                                    "price": "50.00"
                                }
                            }
                        ]
                    }
                }
            },
            {
                "cursor": "eyJsYXN0X2lkIjo3Mjg5MTQ4NzM1NjY4LCJsYXN0X3ZhbHVlIjoiNzI4OTE0ODczNTY2OCJ9",
                "node": {
                    "id": "gid://shopify/Product/7289148735668",
                    "title": "Default Product",
                    "handle": "default-product",
                    "vendor": "Allo",
                    "metafields": [
                        {
                            "value": "Default"
                        },
                        {
                            "value": "[\"gid://shopify/Product/7288095244468\",\"gid://shopify/Product/7278769995956\"]"
                        }
                    ],
                    "collections": {
                        "edges": [
                            {
                                "node": {
                                    "title": "Manual Collection",
                                    "id": "gid://shopify/Collection/292016226484"
                                }
                            },
                            {
                                "node": {
                                    "title": "Price Drop",
                                    "id": "gid://shopify/Collection/292133208244"
                                }
                            }
                        ]
                    },
                    "description": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
                    "featuredImage": {
                        "url": "/placeholder.webp"
                    },
                    "priceRange": {
                        "minVariantPrice": {
                            "amount": "45.0"
                        },
                        "maxVariantPrice": {
                            "amount": "45.0"
                        }
                    },
                    "totalInventory": 19,
                    "tags": [],
                    "productType": "Vape",
                    "variants": {
                        "edges": [
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/41947882946740",
                                    "compareAtPrice": "50.00",
                                    "price": "45.00"
                                }
                            }
                        ]
                    }
                }
            },
            {
                "cursor": "eyJsYXN0X2lkIjo3Mjk2NDczNDY1MDEyLCJsYXN0X3ZhbHVlIjoiNzI5NjQ3MzQ2NTAxMiJ9",
                "node": {
                    "id": "gid://shopify/Product/7296473465012",
                    "title": "Example T-Shirt",
                    "handle": "example-t-shirt",
                    "vendor": "Acme",
                    "metafields": [
                        {
                            "value": "Bubble"
                        },
                        null
                    ],
                    "collections": {
                        "edges": [
                            {
                                "node": {
                                    "title": "Price Drop",
                                    "id": "gid://shopify/Collection/292133208244"
                                }
                            }
                        ]
                    },
                    "description": "",
                    "featuredImage": {
                        "url": "/placeholder.webp"
                    },
                    "priceRange": {
                        "minVariantPrice": {
                            "amount": "19.99"
                        },
                        "maxVariantPrice": {
                            "amount": "25.0"
                        }
                    },
                    "totalInventory": 10,
                    "tags": [
                        "mens t-shirt example"
                    ],
                    "productType": "Shirts",
                    "variants": {
                        "edges": [
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/41970466455732",
                                    "compareAtPrice": null,
                                    "price": "25.00"
                                }
                            },
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/41970466488500",
                                    "compareAtPrice": "24.99",
                                    "price": "19.99"
                                }
                            },
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/41970466521268",
                                    "compareAtPrice": "24.99",
                                    "price": "19.99"
                                }
                            }
                        ]
                    }
                }
            },
            {
                "cursor": "eyJsYXN0X2lkIjo3Mjk2NDczNDk3NzgwLCJsYXN0X3ZhbHVlIjoiNzI5NjQ3MzQ5Nzc4MCJ9",
                "node": {
                    "id": "gid://shopify/Product/7296473497780",
                    "title": "Example Pants",
                    "handle": "example-pants",
                    "vendor": "Acme",
                    "metafields": [
                        null,
                        null
                    ],
                    "collections": {
                        "edges": [
                            {
                                "node": {
                                    "title": "Price Drop",
                                    "id": "gid://shopify/Collection/292133208244"
                                }
                            }
                        ]
                    },
                    "description": "",
                    "featuredImage": {
                        "url": "/placeholder.webp"
                    },
                    "priceRange": {
                        "minVariantPrice": {
                            "amount": "49.99"
                        },
                        "maxVariantPrice": {
                            "amount": "49.99"
                        }
                    },
                    "totalInventory": 0,
                    "tags": [
                        "mens pants example"
                    ],
                    "productType": "Pants",
                    "variants": {
                        "edges": [
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/41970466619572",
                                    "compareAtPrice": "57.99",
                                    "price": "49.99"
                                }
                            }
                        ]
                    }
                }
            },
            {
                "cursor": "eyJsYXN0X2lkIjo3MzA3NzQ1Mzk0ODY4LCJsYXN0X3ZhbHVlIjoiNzMwNzc0NTM5NDg2OCJ9",
                "node": {
                    "id": "gid://shopify/Product/7307745394868",
                    "title": "RUFPUF 7500 DISPOSABLE",
                    "handle": "rufpuf-7500-disposable",
                    "vendor": "RUFPUF",
                    "metafields": [
                        {
                            "value": "Bubble"
                        },
                        {
                            "value": "[\"gid://shopify/Product/7288095244468\",\"gid://shopify/Product/7289148735668\"]"
                        }
                    ],
                    "collections": {
                        "edges": [
                            {
                                "node": {
                                    "title": "Price Drop",
                                    "id": "gid://shopify/Collection/292133208244"
                                }
                            }
                        ]
                    },
                    "description": "RUFPUF 7500 DISPOSABLE RUFPUF disposables are prefilled with sensational flavors to satisfy all your cravings! RUFPUF disposables boast an elegant and intuitive design with a quad-adjustable airflow and rechargeable battery. *Device may need to be charged before first use* Product Features: Approx. 7500 Puffs Unique & Elegant Design Available in 20mg/mL E-liquid Capacity: 17mL Rechargeable 600 mAh battery Product Includes: 1 x RUFPUF 7500 Disposable Device 1 x USB Type-C Charging Cable",
                    "featuredImage": {
                        "url": "/placeholder.webp"
                    },
                    "priceRange": {
                        "minVariantPrice": {
                            "amount": "20.0"
                        },
                        "maxVariantPrice": {
                            "amount": "28.99"
                        }
                    },
                    "totalInventory": 60,
                    "tags": [
                        "New"
                    ],
                    "productType": "Disposable",
                    "variants": {
                        "edges": [
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/42011400011956",
                                    "compareAtPrice": "28.99",
                                    "price": "20.00"
                                }
                            },
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/42011400044724",
                                    "compareAtPrice": null,
                                    "price": "28.99"
                                }
                            },
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/42011400077492",
                                    "compareAtPrice": null,
                                    "price": "28.99"
                                }
                            },
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/42011400110260",
                                    "compareAtPrice": null,
                                    "price": "28.99"
                                }
                            },
                            {
                                "node": {
                                    "id": "gid://shopify/ProductVariant/42011400143028",
                                    "compareAtPrice": null,
                                    "price": "28.99"
                                }
                            }
                        ]
                    }
                }
            }
        ]

    return (
        <>

            <Accordion id={7278769995956} description="test" title="Test Product" />

        </>
    )
}
