import Image from 'next/image';

// One photo frame: <figure class="photo" data-slot="..."><img data-photo ...></figure>
//
// photo     an entry from data/photos.js. With src: null the frame shows the stone surface and names its slot.
// sizes     how wide the photo is on screen, so the browser asks for the right file.
// eager     true only for the hero: loaded first, never lazy.
// reveal    true to let the frame wipe open as it scrolls into view (data-rv="photo").
// todo      true to mark the frame as unconfirmed (red dashed outline).
// imgProps  extra attributes for the <img>, for example { 'data-intro': 'settle' }.
export default function Photo({ photo, className = '', sizes, eager = false, reveal = false, todo = false, imgProps = {} }) {
  const frame = {
    className: ('photo ' + className + (photo.src ? '' : ' is-missing')).replace(/\s+/g, ' ').trim(),
    'data-slot': photo.slot
  };
  if (reveal) frame['data-rv'] = 'photo';
  if (todo) frame['data-todo'] = '';

  if (!photo.src) return <figure {...frame} />;

  const loading = eager ? { loading: 'eager', fetchPriority: 'high' } : {};

  return (
    <figure {...frame}>
      <Image
        data-photo=""
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        sizes={sizes}
        {...loading}
        {...imgProps}
      />
    </figure>
  );
}
