/**
 * Photo lists for the Gallery and Moments of Glory pages.
 *
 * The archive photos only exist on the original server as 150×150 thumbnails
 * (the full-size files return 404), so they are displayed at that size.
 */

/** Descriptive alt text for the full-resolution gym photographs. */
export const gymPhotoAlts = {
  'gymphotos/Screenshot_20161226-090641~2.jpg': 'Aerobics studio with exercise balls and mats',
  'gymphotos/Screenshot_20161226-090653~2.jpg': 'Members in a group class in the studio',
  'gymphotos/Screenshot_20161226-090659~2.jpg': 'Row of treadmills facing the windows',
  'gymphotos/Screenshot_20161226-090711~2.jpg': 'Strength training floor with benches and machines',
  'gymphotos/Screenshot_20161226-090716~2.jpg': 'Rack of fixed dumbbells',
  'gymphotos/Screenshot_20161226-090752~2.jpg': 'Weight training area with racks and machines',
  'gymphotos/Screenshot_20161226-090757~2.jpg': 'Studio floor with exercise balls',
  'gymphotos/Screenshot_20161226-090802~2.jpg': 'Barbell rack with fixed-weight barbells',
  'gymphotos/Screenshot_20161226-090808~2.jpg': 'Pro series dumbbells lined up on racks',
  'gymphotos/Screenshot_20161226-090845~2.jpg': 'Cable machines and resistance stations',
  'gymphotos/IMG_1320.jpg': 'Trainer and member on the cardio floor',
  'gymphotos/IMG_13361.jpg': 'Visitors posing for a photo at Bob’s Gym',
}

export const gymPhotos = Object.entries(gymPhotoAlts).map(([src, alt]) => ({ src, alt }))

const thumbs = (dir, names, label) =>
  names.map((n, i) => ({ src: `images/${dir}/${n}-150x150.jpg`, alt: `${label} ${i + 1}` }))

export const archivePhotos = thumbs(
  'gal',
  ['1', '10', '11', '12', '13', '14', '15', '16', '2', '2toto1', '3', '4', '5', '6', '7', '8', '9', 'photo-12', 'photo-161', 'photo-21', 'photo-311', 'photo-41', 'photo1'],
  'Bob’s Gym archive photo',
)

export const momentsPhotos = thumbs(
  'moments of the day',
  ['102', '17', '18', '21', '22', '31', '32', '41', '42', '52', '53', '61', '62', '71', '72', '81', '82', '91'],
  'Moment of glory',
)
