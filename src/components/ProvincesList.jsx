import React, { useCallback } from 'react'
import ProvinceLink from './ProvinceLink'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ProvincesList = ({ communities, provinces }) => {
    return (
        <section className="main__ccaa-section">
            <article className="ccaa-section__list">
                {communities.map((communitie) => (
                <div className="list__ccaa-div">
                    <p className="ccaa-div__link" href="#">{communitie.name}</p>
                    <ul className="ccaa-div__provinces-list">
                    {
                        provinces.filter(province => province.fields.ccaa == communitie.name)
                        .map((province) => (
                            <ProvinceLink province={province} />
                        )
                        )
                    }
                    </ul>
                </div>
                ))}
            </article>
        </section>
    )

}
export default ProvincesList