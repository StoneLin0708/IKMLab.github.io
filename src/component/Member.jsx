import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import {memberData, parsingRule} from 'src/res/data/member.js'
import MemberStyle from 'src/style/Member.module.scss'

class MemberSection extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let members = memberData
        .filter((member)=>parsingRule.deg[member.deg]===this.props.deg)

    if (this.props.isAlumni) {
      members = members.filter((member)=>member.year)
      members = members.sort((memberA, memberB)=>{
        if (memberA.year!==memberB.year) {
          return memberB.year-memberA.year
        }
        return memberA.dept-memberB.dept
      })
    } else {
      members = members.filter((member)=>!member.year)
          .sort((memberA, memberB)=>memberA.dept-memberB.dept)
    }

    let title = ''

    if (this.props.isAlumni) {
      title += 'Alumni '
    }
    if (this.props.deg === 'phd') {
      title += 'Ph.D. Students'
    } else {
      title += 'Master Students'
    }

    return (
      <Grid
        className={MemberStyle[`${this.props.deg}-section`]}
        container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <h1
            className={MemberStyle['member-section-title']}>
            {title}
          </h1>
        </Grid>
        {
          members.map((member)=>(
            <Grid
              className={MemberStyle['member']}
              container
              item xs={12} sm={4} md={3} lg={2} xl={2}
              key={member.zh + member.en + member.dept + member.deg}>
              <img
                className={MemberStyle['member-image']}
                src={member.image}/>
              {member.zh &&
              <h2 className={MemberStyle['member-name']}>
                {member.zh}
              </h2>}
              {member.en &&
              <h2 className={MemberStyle['member-name']}>
                {member.en}
              </h2>}
              <span className={MemberStyle['member-tags']}>
                <span className={MemberStyle['member-tag']}>
                  {parsingRule.dept[member.dept]}
                </span>
                {member.year &&
                <span className={MemberStyle['member-tag']}>
                  {member.year}
                </span>}
              </span>
            </Grid>
          ))
        }
      </Grid>
    )
  }
}

MemberSection.propTypes = {
  deg: PropTypes.string.isRequired,
  isAlumni: PropTypes.bool.isRequired,
}

export default class Member extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <MemberSection deg='phd' isAlumni={false}/>
        <MemberSection deg='master' isAlumni={false}/>
        <MemberSection deg='phd' isAlumni={true}/>
        <MemberSection deg='master' isAlumni={true}/>
      </>
    )
  }
}
