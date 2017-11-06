port module App exposing (main)

import Html exposing (..)
import Html.Attributes exposing (class, for, id, multiple, src, type_, value, width)
import Html.Events exposing (on, onClick, onInput)
import Json.Decode as Decode exposing (succeed)


onChange : msg -> Html.Attribute msg
onChange msg =
    on "change" (succeed msg)


type alias Flags =
    { imageUploaderId : String
    , note : Note
    }


type alias Image =
    { url : String }


type alias Note =
    { title : String
    , contents : String
    , images : List Image
    }


port uploadImages : () -> Cmd msg


port saveNote : Note -> Cmd msg


port receiveImages : (List Image -> msg) -> Sub msg


type alias Model =
    { imageUploaderId : String
    , note : Note
    }


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( Model flags.imageUploaderId flags.note, Cmd.none )


viewImage : Image -> Html Msg
viewImage image =
    li [ class "image-upload__image" ]
        [ img
            [ src image.url
            , width 400
            ]
            []
        ]


viewImageUpload : Model -> Html Msg
viewImageUpload model =
    div [ class "image-upload" ]
        [ label [ for model.imageUploaderId ]
            [ text "+ Add Images" ]
        , input
            [ id model.imageUploaderId
            , type_ "file"
            , multiple True
            , onChange UploadImages
            ]
            []
        , ul [ class "image-upload__images" ]
            (List.map viewImage model.note.images)
        ]


view : Model -> Html Msg
view model =
    div [ class "note" ]
        [ div [ class "note__info" ]
            [ h2 [] [ text "Info" ]
            , div [ class "note__title" ]
                [ label [] [ text "Title:" ]
                , input
                    [ type_ "text"
                    , value model.note.title
                    , onInput UpdateTitle
                    ]
                    []
                ]
            , div [ class "note__contents" ]
                [ label [] [ text "Contents:" ]
                , textarea
                    [ value model.note.contents
                    , onInput UpdateContents
                    ]
                    []
                ]
            ]
        , div [ class "note__images" ]
            [ h2 [] [ text "Images" ]
            , viewImageUpload model
            ]
        ]


updateTitle : String -> Note -> Note
updateTitle title note =
    { note | title = title }


updateContents : String -> Note -> Note
updateContents contents note =
    { note | contents = contents }


addImages : List Image -> Note -> Note
addImages images note =
    { note | images = note.images ++ images }


updateNote : (Note -> Note) -> Model -> ( Model, Cmd msg )
updateNote updater model =
    let
        newNote =
            updater model.note
    in
        ( { model | note = newNote }
        , saveNote newNote
        )


type Msg
    = UploadImages
    | ReceiveImages (List Image)
    | UpdateTitle String
    | UpdateContents String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UploadImages ->
            ( model, uploadImages () )

        ReceiveImages images ->
            updateNote (addImages images) model

        UpdateTitle title ->
            updateNote (updateTitle title) model

        UpdateContents contents ->
            updateNote (updateContents contents) model


subscriptions : Model -> Sub Msg
subscriptions model =
    receiveImages ReceiveImages


main : Program Flags Model Msg
main =
    Html.programWithFlags
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
